import React from 'react'
import { userAction } from '../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function ConfirmBlock() {
  
const dispatch = useDispatch();

const isModal = useSelector((store) => store.userReducer.isModalBlock);
  return (
    <div className={`overlay ${isModal ? "" : "hidden"}`}>
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              dispatch(userAction.setIsModalBlock(false));
            }}
          ></i>
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light">Hủy</button>
          <button className="btn btn-danger">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}
