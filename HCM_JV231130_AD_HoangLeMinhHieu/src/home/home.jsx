import "./home.scss";
import AddMore from "../components/AddMore";
import ConfirmBlock from "../components/ConfirmBlock";
import ConfirmDelete from "../components/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userAction } from "../store/user.slice";
import axios from "axios";
export default function home() {
  const dispatch = useDispatch();
  const [titleForm, setTitleForm] = useState("Thêm Mới")
  const userList = useSelector((store) => store.userReducer);

  const handleDelete = (id) => {
    dispatch(userAction.setIsModalDelete(true));
    dispatch(userAction.setUserId(id));
  };

  //search
  const handleSearch = async (e) => {
    let keyword = e.target.value;

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${keyword}`
      );
      dispatch(userAction.setData(res.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  //paginate
  const handlePageChange = async (number) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users?_page=${number}&_per_page=4`
      );
      dispatch(userAction.setData(res.data.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  //handleUpdate
  const handleUpdate = (id) =>{
    setTitleForm("Chỉnh sửa");
   dispatch(userAction.setIsModalAdd(true));
    dispatch(userAction.setUserId(id));


  }

  return (
    <div>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button
              className="btn btn-primary"
              onClick={() => {
                setTitleForm("Thêm mới");
                dispatch(userAction.setIsModalAdd(true));
              }}
            >
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: "350px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              onChange={() => {
                handleSearch(event);
              }}
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh"></i>
          </div>
          {/* <!-- Danh sách nhân viên --> */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan="2">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {userList.data?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div className="status status-stop"></div>
                        <span> Ngừng hoạt động</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="button button-block"
                        onClick={() => {
                          dispatch(userAction.setIsModalBlock(true));
                        }}
                      >
                        Bỏ chặn
                      </span>
                    </td>
                    <td>
                      <span
                        className="button button-edit"
                        onClick={() => {
                          handleUpdate(user.id);
                        }}
                      >
                        Sửa
                      </span>
                    </td>
                    <td>
                      <span
                        className="button button-delete"
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                      >
                        Xóa
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected>Hiển thị 3 bản ghi trên trang</option>
              <option>Hiển thị 10 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    handlePageChange(1);
                  }}
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    handlePageChange(2);
                  }}
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    handlePageChange(3);
                  }}
                >
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>
      <AddMore titleForm={titleForm}/>
      <ConfirmBlock />
      <ConfirmDelete />
    </div>
  );
}
