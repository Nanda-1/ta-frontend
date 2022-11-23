import React, { Component } from "react";
import OtpInput from "./lib/OTPReader";
import cookies from "js-cookie";
import { RegistContext } from "./RegistContext";
import swal from "sweetalert";

class Modal2 extends Component {
  static contextType = RegistContext;

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      otp: "",
      phone: cookies.get("phone"),
      time: {},
      seconds: 60,
      numInputs: 6,
      separator: "-",
      isdisable: false,
      isdisabled: true,
      hasErrored: false,
      isInputNum: true,
      isInputSecure: false,
      minLength: 0,
      maxLength: 30,
      placeholder: "",
      getDump: [],
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  getPhone = () => {
    if (this.state.phone === null) {
      swal({
        title: "Gagal!",
        text: "Harap masukan no.handphone Anda",
        icon: "warning",
      });
    } else {
      var str = this.state.phone.length - 3;
      var res = this.state.phone.substring(3, str);
      var newStr = this.state.phone.replace(res, "******");
    }
    return newStr;
  };

  clearOtp = () => {
    this.setState({ otp: "" });
  };

  handleOtpChange = (otp) => {
    this.setState({ otp });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let kode_otp = this.state.otp;
    cookies.set("otp_sms", this.state.otp);
    this.context.verifiedOTP(kode_otp);
  };

  handle = (e) => {
    e.preventDefault();
    let kode_otp = this.state.otp;
    cookies.set("otp_sms", this.state.otp);
    this.context.verifiedOTP(kode_otp);
  };

  secondsToTime(secs) {
    let hours = Number(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Number(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    this._isMounted = true;
    this.button.hidden = true;

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
    if (this._isMounted) {
      this.setState({
        getDump: this.state.numInputs,
      });
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
      swal({
        title: "Gagal!",
        text: "OTP Telah Kadaluarsa",
        icon: "warning",
      }).then(() => {
        this.button.hidden = false;
      });
    }
  }

  Resend = () => {
    window.location.reload();
    this.context.resendOTPRegist();
  };

  render() {
    const {
      otp,
      phone,
      numInputs,
      separator,
      isdisabled,
      isInputNum,
      placeholder,
    } = this.state;

    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-800- max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="text-right mt-3">
                <a
                  href="/register"
                  className="text-black text-sm px-4 py-2 outline-none"
                >
                  <i className="fas fa-times text-black"></i>
                </a>
              </div>
              <div className="flex items-start justify-center p-6 rounded-t">
                <h3 className="text-2xl font-semibold text-blue-500 pt-3">
                  Verifikasi Nomor Handphone
                </h3>
              </div>
              <div className="my-1 mx-6 text-blueGray-500 text-xs text-center">
                Anda akan menerima SMS OTP. <br />
                Silahkan input 6 digit angka yang terkirim pada nomor handphone
                Anda <br />
                <p className="font-bold text-blue-500 mt-2">
                  {this.getPhone(phone)}
                </p>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="margin-top--small mt-4">
                  <OtpInput
                    className="text-center otc pl-otp"
                    inputStyle="inputStyle"
                    numInputs={numInputs}
                    errorStyle="error"
                    onChange={this.handleOtpChange}
                    separator={<span>{separator}</span>}
                    isInputNum={isInputNum}
                    shouldAutoFocus
                    value={otp}
                    placeholder={placeholder}
                  />
                </div>
                <div className="btn-row mx-auto text-center">
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600
                    text-sm px-4 py-2 mr-1 my-6 w-24 rounded-xl shadow
                    hover:shadow-lg outline-none focus:outline-none ease-linear
                    transition-all duration-150"
                    type="button"
                    disabled={isdisabled || otp.trim() === ""}
                    onClick={this.clearOtp}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600
                    text-sm px-4 py-2 mr-1 my-6 w-24 rounded-xl shadow
                    hover:shadow-lg outline-none focus:outline-none ease-linear
                    transition-all duration-150"
                    onClick={this.handle}
                  >
                    Verifikasi
                  </button>
                </div>
              </form>
              <div className="text-blueGray-500 text-xs text-center mb-8">
                Mohon menunggu {this.state.time.s} detik untuk <br />{" "}
                mengirimkan ulang kode OTP yang baru.
                <br />
                <button
                  className="bg-white text-blue text-xs active:bg-blue-600
                    px-3 py-1 mr-1 my-2 mb-4 rounded-xl shadow
                    hover:shadow-lg outline-none focus:outline-none ease-linear
                    transition-all duration-150"
                  onClick={this.Resend}
                  ref={(button) => (this.button = button)}
                >
                  Kirim Ulang OTP
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }
}

export default Modal2;
