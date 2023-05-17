import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { io } from "socket.io-client";
import swal from "sweetalert";

export default function Socketio({ id, email }) {
  const history = useHistory();

  useEffect(() => {
    const socket = io("https://be-ppat-transaction.infinids.id");

    //   socket.on("connect", () => {
    //     console.log(`Connected with ID: ${socket.id}`);
    //   });

    socket.on(`update document ${id}`, (data) => {
      swal({
        title: "Berhasil",
        text: data.message,
        icon: "success",
      }).then(function () {
        // props._next();
        //   getDokumenAjb(id);
      });
      // setDisabled(!disabled);
    });

    socket.on(`room start ${id}`, (data) => {
      swal({
        title: "Berhasil",
        text: data.message,
        icon: "success",
      }).then(() => {
        history.push("/ruang_virtual=testing&&id=" + id);
      });
    });

    socket.on(`ttd ${id} ${email}`, (data) => {
      swal({
        // title: "",
        text: data.message,
        icon: "warning",
      });
      // setDisabled(!disabled);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div></div>;
}
