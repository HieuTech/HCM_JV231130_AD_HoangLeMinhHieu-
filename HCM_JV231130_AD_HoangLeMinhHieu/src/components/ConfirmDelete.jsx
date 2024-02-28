import React from "react";
import { userAction } from "../store/user.slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function ConfirmDelete() {
  const dispatch = useDispatch();

  const isModalDelete = useSelector((store) => store.userReducer.isModalDelete);
  const getUserId = useSelector((store) => store.userReducer.userId);
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/users/${getUserId}`)
        .then((response) => {
          dispatch(userAction.deleteData(response.data.id));
        });

      console.log("data delete", res.data);
    } catch (error) {
      console.log("error", error);
    }
    dispatch(userAction.setIsModalDelete(false))
  };

  return (
    <div className={`overlay ${isModalDelete ? "" : "hidden"}`}>
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              dispatch(userAction.setIsModalDelete(false));
            }}
          ></i>
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light">Hủy</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              confirmDelete();
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
