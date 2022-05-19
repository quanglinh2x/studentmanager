
import './App.css';
import {useStore,actions} from './Manager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobile, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {useRef, useState, useEffect} from 'react'
function App() {
  const sexs = [
    {
      id : 1,
      name : 'Nam'
    },
    {
      id : 2,
      name : 'Nữ'
    },
    {
      id : 3,
      name : 'Khác'
    },
  ]
  
  const frameworks = [
    {
      id : 1,
      name : 'ReactJS'
    },
    {
      id : 2,
      name : 'VueJS'
    },
    {
      id : 3,
      name : 'Angular'
    },
  ]
  const [state, dispatch] = useStore()
  
  const firstRef = useRef()
 
  let isEdit = false
  
  
  const [isedit, setIsedit] = useState(false)
  const [idedit, setIdedit] = useState()

  let { students,
          avataInput, 
          surnameInput,
          nameInput,
          phoneInput,
          emailInput,
          addressInput,
          sexInput,
          frameworkInput,
  } = state
  
  const handleCheck = (name) => {
    const isChecked = frameworkInput.includes(name)
    if(isChecked){
      frameworkInput = frameworkInput.filter(item => item !== name)
    }else{
      frameworkInput = [...frameworkInput, name]
    }
    dispatch(actions.setFrameworkInput(frameworkInput))
  }

  const handleAdd = () => {
    
    if(state.surnameInput==''||state.nameInput==''||state.phoneInput==''||state.emailInput==''||state.addressInput==''||
    state.frameworkInput==[]
    
    
    ){
      alert('vui lòng nhập đầy đủ ')
    
  }
  else{
    
    dispatch(actions.addStudent({
      surname : surnameInput,
      name : nameInput,
      phone : phoneInput,
      
      email : emailInput,
      address : addressInput,
      sex : sexInput,
      framework : frameworkInput,
    }))
    
    // dispatch(actions.addStudent(surnameInput))
    state.surnameInput = ''
    state.nameInput = ''
    state.phoneInput = ''
    document.querySelector('.file').value=''
    state.emailInput = ''
    state.addressInput = ''
    state.sexInput = 1
    
    state.frameworkInput = ''
    firstRef.current.focus()
  }}

  const handleEdit = (index) => {
    
    
    dispatch(actions.setNameInput(students[index].name))
    
    dispatch(actions.setSurnameInput(students[index].surname))
    dispatch(actions.setPhoneInput(students[index].phone))
    dispatch(actions.setEmailInput(students[index].email))
    dispatch(actions.setAddressInput(students[index].address))
    dispatch(actions.setSexInput(students[index].sex))
    dispatch(actions.setFrameworkInput(students[index].framework))
    
    setIsedit(true)
    setIdedit(index)
    
    firstRef.current.focus()

  }

  const handleSave = () => {
    if(state.surnameInput==''||state.nameInput==''||state.phoneInput==''||state.emailInput==''||state.addressInput==''||
    state.frameworkInput==[]

    ){
      alert('vui lòng không bỏ trống ')
  }else{
    dispatch(actions.editStudent(
      {

        stt:idedit,
        surname : surnameInput,
        name : nameInput,
        phone : phoneInput,
        email : emailInput,
        address : addressInput,
        sex : sexInput,
        framework : frameworkInput,
      }
    ))
    
    setIsedit(false)
    state.surnameInput = ''
    state.nameInput = ''
    state.phoneInput = ''

    state.emailInput = ''
    state.addressInput = ''
    state.sexInput = 1
    state.frameworkInput = ''
    firstRef.current.focus()

  }}
  

  const handleCancel = () => {
    setIsedit(false)
    state.surnameInput = ''
    state.nameInput = ''
    state.phoneInput = ''

    state.emailInput = ''
    state.addressInput = ''
    state.sexInput = 1
    state.frameworkInput = ''
    firstRef.current.focus()
  }

  const handleAvata = (e) =>{
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    dispatch(actions.setAvataInput(file))
  }

  useEffect(() => {
        //Clean up
        return () => {
          avataInput && URL.revokeObjectURL(avataInput.preview)
        } 
  }, [avataInput])
  return (
    <div className="App">
      <div className="form">
        <div className="title">
          <h2>Quản lý học sinh</h2>
          <h2>Quản lý sinh viên cùng khóa</h2>
          <img src="./learn.png"/>
        </div>
        
        <div className="container">
          <div>
            <form>
              <div className="name">
                <div className="sur-name">
                  <span><FontAwesomeIcon icon={faCircleUser} /></span>
                  <input
                          type="text"
                          ref={firstRef}
                          value={surnameInput}
                          placeholder= "Nhập họ và tên đệm"
                          onChange={e => {
                            dispatch(actions.setSurnameInput(e.target.value))
                          }}
                        />
                </div>
                <div className="main-name">
                  <span><FontAwesomeIcon icon={faPerson} /></span>
                  <input
                          type="text"
                          value={nameInput}
                          placeholder= "Nhập tên"
                          onChange={e => {
                            dispatch(actions.setNameInput(e.target.value))
                          }}
                        />
                </div>
              </div>
              <div className="info">
                <div className="mobile-number">
                  <span><FontAwesomeIcon icon={faMobile} /></span>
                  <input
                          type="text"
                          value={phoneInput}
                          placeholder= "Số điện thoại"
                          onChange={e => {
                            dispatch(actions.setPhoneInput(e.target.value))
                          }}
                        />
                </div>
                <div className="email">
                  <span><FontAwesomeIcon icon={faEnvelope} /></span>
                  <input
                          type="text"
                          placeholder= "Email"
                          value={emailInput}
                          onChange={e => {
                            dispatch(actions.setEmailInput(e.target.value))
                          }}
                        />
                </div>

              </div>
              <div className="address">
                <div className="address-container">
                  <span><FontAwesomeIcon icon={faAddressCard} /></span>
                  <input
                          type="text"
                          placeholder= "Địa chỉ"
                          value={addressInput}
                          onChange={e => {
                            dispatch(actions.setAddressInput(e.target.value))
                          }}
                        />
                </div>
                

              </div>
              <div >
                <input className="file" type="file" onChange={handleAvata} />
              </div>
              <div className="sex select">
                <h2>Giới tính</h2>
                <div className="input-item">
                  {sexs.map(sex => (
                      <div key={sex.id} className="sex-select">
                        <input 
                          id={`ip-${sex.id}`}
                          type="radio"
                          value={sexInput}
                          checked = {sexInput === sex.id}
                          onChange={() => dispatch(actions.setSexInput(sex.id))}
                        ></input>
                        <label htmlFor={`ip-${sex.id}`}>{sex.name}</label>
                      </div>
                    ))}
                </div>
              </div>
              <div className="framework select">
                <h2>Framework được chọn:</h2>
                <div className="input-item">
                  {frameworks.map(framework => (
                      <div key={framework.id} className="framework-select">
                        <input 
                        id={`cb-${framework.id}`}
                        type="checkbox"
                        checked = {frameworkInput&&frameworkInput.includes(framework.name)}
                        onChange={() => handleCheck(framework.name)}
                      ></input>
                      <label htmlFor={`cb-${framework.id}`}>{framework.name}</label>
                      </div>
                    ))}
                </div>
              </div>
              
            </form>
          </div>
        </div>
        <div>
                {(isedit) ?  <div>
                  <button
                    key={"save"}
                    className="btn btn-save"
                    onClick={ handleSave}
                  >
                    Lưu
                  </button>
                  <button
                    key={"cancel"}
                    className="btn btn-cancel"
                    onClick={ handleCancel}
                  >
                    Hủy
                  </button>
                </div>
                : 

                  <button 
                    key={"add"}
                    className="btn"
                    onClick={ handleAdd}
                    >Thêm mới
                  </button>
                
                
                }  
              </div>
      </div>
      <div className="table">
        <header>Danh sách sinh viên</header>
        <div className="list">
          <div className="list-item">
            <h5>STT</h5>
            <h5>Avatar</h5>
            <h5>Họ và tên đệm</h5>
            <h5>Tên</h5>
            <h5>Số điện thoại</h5>
            <h5>Email</h5>
            <h5>Địa chỉ</h5>
            <h5>Giới tính</h5>
            <h5>Ngôn ngữ</h5>
            
            <h5>Chức năng</h5>
          </div >
        </div>
        <div className="table-body">
          {students.map((student,index) => (
               
                <div className="table-body-wrapper">
                  <span>{(index + 1 )}</span>
                  <span>{ avataInput && (
                        <img key={index}
                            src={avataInput[index]!=undefined ? avataInput[index].preview :[]} alt="" width="80%"
                        />
                        )
                    }
                  </span>
                  <span>{student.surname}</span>
                  <span>{student.name}</span>
                  <span>{student.phone}</span>
                  
                  <span>{student.email}</span>
                  <span>{student.address}</span>
                  <span>{(student.sex === 1) ? 'Nam' : (student.sex === 2) ? 'Nữ' : 'Khác'}</span>
                  <span>{student.framework&&student.framework.join(', ')}</span>
                  {/* <span>{(student.framework.includes(1,2,3)) ? 'ReacJS, VueJS, Angular' : 
                       (student.framework.includes(2)) ? 'VueJS' :
                       (student.framework.includes(3)) ? 'Angular' : 'No'}</span> */}
                  <span >
                    <div className='fill-button'>
                      <button className="btn-handle" onClick={() => handleEdit(index)}>Sửa</button>
                      <button className="btn-handle btn-delete" onClick={() => {dispatch(actions.deleteStudent(index))}}>Xóa</button>
                    </div>
                  </span>
                </div>
              ))}
        </div>
        
      </div>
    </div>
  );
}

export default App;
