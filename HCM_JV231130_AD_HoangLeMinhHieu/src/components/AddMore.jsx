import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/user.slice";
import axios from "axios";

export default function AddMore(props) {
    const {titleForm} = props
  const dispatch = useDispatch();
  const [isValidate, setIsValidate] = useState(true);
  const isModal = useSelector((store) => store.userReducer.isModalAdd);
      const userId = useSelector((store) => store.userReducer.userId);

  const handleSubmit = async (e) => {
      console.log("userId", userId);

    e.preventDefault();
    let fullName = e.target.fullName.value;
    let email = e.target.email.value;
    let address = e.target.address.value;
    let date = e.target.date.value;

    const addUser = {
      fullName,
      email,
      date,
      address,
    };
    
    if (!fullName || !email || date) {
      setIsValidate(false);
      return;
    }
    setIsValidate(true);

    //check update

    if (titleForm == "Chỉnh sửa"){
        try {
            
              await axios.put(`http://localhost:3000/users/${userId}`, addUser)
            .then(response => {
              dispatch(userAction.updateData(response.data));
            });
        } catch (error) {
            console.log("error",error);
        }

        
    }else{
        try {
          await axios
            .post("http://localhost:3000/users", addUser, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              dispatch(userAction.addData(response.data));
            });
        } catch (error) {
          console.log("error", error);
        }
    }
            dispatch(userAction.setIsModalAdd(false));

  };


  


  return (
    <div className={`overlay ${isModal ? "" : "hidden"}`}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>{titleForm} nhân viên</h4>
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              dispatch(userAction.setIsModalAdd(false));
            }}
          ></i>
        </div>
        <div>
          <label className="form-label" htmlFor="userName">
            Họ và tên
          </label>
          <input
            id="userName"
            type="text"
            name="fullName"
            className="form-control"
          />
          {console.log("", isValidate)}
          {isValidate ? (
            ""
          ) : (
            <div className="form-text error">
              Họ và tên không được để trống.
            </div>
          )}
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">
            Ngày sinh
          </label>
          <input
            id="dateOfBirth"
            type="date"
            name="date"
            className="form-control"
          />
        </div>
        {isValidate ? (
          ""
        ) : (
          <div className="form-text error">
            Ngày sinh không được lớn hơn ngày hiện tại.
          </div>
        )}
        <div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input id="email" type="text" name="email" className="form-control" />
        </div>
        {isValidate ? (
          ""
        ) : (
          <div className="form-text error">Email không được để trống.</div>
        )}
        <div>
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <textarea
            name="address"
            className="form-control"
            id="address"
            rows="3"
          ></textarea>
        </div>
        <div>
          {titleForm == "Chỉnh sửa" ? (
            <button className="w-100 btn btn-primary"
            onClick={()=>{
                handleUpdate()
            }}
            >
              Chỉnh sửa
            </button>
          ) : (
            <button type="submit" className="w-100 btn btn-primary">
              Thêm mới
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
