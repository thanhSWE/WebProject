const USERS = "userList"
const LOGINED = "logined"

const logined = localStorage.getItem(LOGINED)
if (logined != null) {
  alert("Bạn đã đăng nhập!")
  location.replace("./detail.html")
}
function login(e) {
  e.preventDefault()

  const email = document.getElementById("email")
  const password = document.getElementById("password")
  const emailValue = email.value
  const passwordValue = password.value

  const data = localStorage.getItem(USERS)

  if (!data) {
    alert("Tài khoản không tồn tại, vui lòng đăng ký tài khoản mới")
    return
  }
  const userList = JSON.parse(data)

  const searchResult = userList.find((item) => {
    return item.email == emailValue && item.password == passwordValue
  })

  if (searchResult) {
    localStorage.setItem(LOGINED, JSON.stringify(searchResult))
    alert("Đăng nhập thành công!")
    location.replace("../../trangchu.html")
  } else alert("Vui lòng kiểm tra lại email và mật khẩu")
}
const formLogin = document.querySelector(".form-login")

if (formLogin) formLogin.addEventListener("submit", login)

function signup(e) {
  e.preventDefault()
  const phoneNumber = document.getElementById("phone-number")
  const email = document.getElementById("email-signup")
  const password = document.getElementById("password-signup")
  const passwordRepeat = document.getElementById("password-signup-repeat")

  const emailValue = email.value
  const passwordValue = password.value
  const phoneNumberValue = phoneNumber.value
  const passwordRepeatValue = passwordRepeat.value
  const data = localStorage.getItem(USERS)

  if (!data) {
    localStorage.setItem(USERS, JSON.stringify([]))
  }
  const userList = JSON.parse(data) || []

  const searchResult = userList.find((item) => {
    return phoneNumberValue === item.phoneNumber || emailValue === item.email
  })

  if (searchResult) {
    alert(
      "Số điện thoại hoặc email đã được sử dụng, vui lòng chọn số điện thoại hoặc email khác"
    )
  } else {
    if (passwordRepeatValue !== passwordValue)
      alert("Mật khẩu không trùng khớp")
    else {
      const newUser = {
        email: emailValue,
        password: passwordValue,
        phoneNumber: phoneNumberValue,
      }
      const newUserList = [...userList, newUser]
      localStorage.setItem(USERS, JSON.stringify(newUserList))
      alert("Tài khoản được tạo thành công!")
      location.replace("./index.html")
    }
  }
}
const formSignup = document.querySelector(".form-signup")

if (formSignup) formSignup.addEventListener("submit", signup)
