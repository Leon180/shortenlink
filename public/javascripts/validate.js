// 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
if (document.querySelector('.needs-validation')) {
  const form = document.querySelector('.needs-validation')
  // Loop over them and prevent submission

  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }, false)

}
