import React, { Component } from "react";
import OtpInput from "./lib/OTPReader";
import cookies from "js-cookie";
import { UserContext } from "Context/UserContext";
import ModalDokumen from "components/Modals/ModalDokumen";

class ModalOtp extends Component {
  static contextType = UserContext;

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
      isDisabled: false,
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

  getPhone = (phone) => {
    var str = phone.length - 3;
    var res = phone.substring(3, str);
    var newStr = phone.replace(res, "******");

    return newStr;
  };

  clearOtp = () => {
    this.setState({ otp: "" });
  };

  handleOtpChange = (otp) => {
    this.setState({ otp });
    // console.log(otp);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let kode_otp = this.state.otp;
    cookies.set("otp_sms", this.state.otp);
    // console.log(this.state.otp);1
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

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
    this.setState({ numInputs: 6 });
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
      this.context.setResend(true);
      // this.context.otpExpired();
      clearInterval(this.timer);
    }
  }

  Resend = () => {
    window.location.reload();
    this.context.setResend(false);
    this.context.functions.otpExpired();
  };

  render() {
    const {
      otp,
      phone,
      numInputs,
      separator,
      isDisabled,
      // hasErrored,
      isInputNum,
      // isInputSecure,
      placeholder,
    } = this.state;

    return (
      <>
        {this.context.loading && <ModalDokumen />}
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-800- max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <a className="text-right mr-3 mt-2 text-blue" href="/login">
                <i className="fas fa-times text-md"></i>
              </a>
              {/*header*/}
              <div className="flex items-start justify-center p-6">
                <h3 className="text-3xl font-bold text-blue pt-1">
                  Verifikasi Nomor Handphone
                </h3>
              </div>
              <div className="my-1 mx-6 text-blueGray-500 text-xs text-center">
                Anda akan menerima SMS OTP.
                <br />
                Silahkan input 6 digit angka yang terkirim pada nomor handphone
                berikut: <br />
                <div className="text-blue text-sm font-bold">
                  {this.getPhone(phone)}
                </div>
              </div>
              {/* <form onSubmit={verifiedOTP}> */}
              <form onSubmit={this.handleSubmit}>
                <div className=" mt-4">
                  <OtpInput
                    className="text-center otp"
                    inputStyle="otpInput"
                    numInputs={6}
                    onChange={this.handleOtpChange}
                    isInputNum={true}
                    value={otp}
                  />
                </div>
                <div className="btn-row mx-auto text-center">
                  <button
                    className="bg-blue text-white active:bg-blue-600
                    text-sm px-4 py-2 mr-1 my-6 w-24 rounded-xl shadow
                    hover:shadow-lg outline-none focus:outline-none ease-linear
                    transition-all duration-150"
                    type="button"
                    disabled={isDisabled || otp.trim() === ""}
                    onClick={this.clearOtp}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-blue text-white active:bg-blue-600
                    text-sm px-4 py-2 mr-1 my-6 w-24 rounded-xl shadow
                    hover:shadow-lg outline-none focus:outline-none ease-linear
                    transition-all duration-150"
                    // disabled={otp.length < numInputs}
                  >
                    Verifikasi
                  </button>
                </div>

                <div className="text-blueGray-500 text-xs text-center mb-8">
                  {this.context.resend ? (
                    <button
                      type="button"
                      onClick={this.Resend}
                      ref={(button) => (this.button = button)}
                    >
                      Kirim Ulang OTP
                    </button>
                  ) : (
                    <>
                      Mohon menunggu {this.state.time.s} detik untuk melakukan{" "}
                      <br /> generate ulang kode OTP yang baru.
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }
}

export default ModalOtp;
