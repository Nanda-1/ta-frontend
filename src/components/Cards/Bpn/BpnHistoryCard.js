// import "./styles.css";

import React, { Component } from "react";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
// import axios from "axios";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class BpnHistoryCard extends Component {

  static contextType = UserContext

  constructor(props) {
    
    super(props);
    this.state = {
      users: [],
      loading: true
    };
  }
  
  async getUsersData1() {
    await fetch(process.env.REACT_APP_BACKEND_HOST +"api/transaction/ppat/list", {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: "Bearer " + Cookies.get('token'),
      },
      // headers: {'Content-Type': 'application/docx'}
    })
      .then(response => response.json())
      .then(result => {
        let data = result.data
        this.setState({users: data });
      })
      .catch(error => console.log('error', error));
  }

  detail
  
  componentDidMount() {
    this.getUsersData1().then(()=> this.syncTable())
  }
  
  // Split as new function to init the datatable
  syncTable() {
    this.$el = $(this.el);
    this.$el.DataTable({
      data: this.state.users, //option 1
      // data: this.getUsersData1(), //option 2
      // columnDefs: [{ 'targets': 0, type: 'date-euro' }],
    order: [0, 'asc'],
      columns: [
        { title: "No",
          "data": "id",
          render: function (data, type, row, meta) {
              return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { 
          title: "Tanggal", 
          data: "created_at",
          render: function(data){
            function convertDate(inputFormat) {
              function pad(s) { return (s < 10) ? '0' + s : s; }
              var d = new Date(inputFormat)
              return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
            }
            let item = convertDate(data)
            return item;
          }
        },
        { title: "Nama PPAT", data: "author_name" },
        { title: "Email", data: "author_email" },
        { title: "Nama Dokumen", data: "doc_name", width: '100'},
        { title: "No. Dokumen", data: "doc_num" },
        { 
          title: "Kategori", 
          data: "doc_type", 
          render: function (data) {
            return data === 'akta_jual_beli' ? 'Akta Jual Beli' : 'Akta Pemberian Hak Tanggungan';
          }
        },
        { title: "Nilai Transaksi", data: "price_value",  render: function (data) {
          var parts = data.toString().split(".");
          parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
          return "Rp " + parts.join(",");
          } 
        },
        {
          title: 'Aksi',
          data: 'id',
          fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
            if(oData.id) {
                $(nTd).html("<a href='/admin/detailBpn/transaction_id="+oData.id+"' class='bg-blue text-white px-2 py-1 rounded-md'>Detail</a>");
            }
        }
        }
      ]
    });
  }

  render() {
    return (
      <div className="bg-white text-sm mt-8 px-3 py-5 top-ppat box-content w-full">
        <div className="text-lg pb-4 font-semibold pl-4 border-b mb-4">
          Aktifitas Terbaru
        </div>
      <table
        className="border top-ppat"
        width="100%"
        ref={(el) => (this.el = el)}
      >
        </table>
      </div>
    );
  }
}

export default BpnHistoryCard;