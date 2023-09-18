const url = "https://script.google.com/macros/s/AKfycbxZLKkOAio18qbU9V9-Du3AT5ELmfv0xBjsFCUjDMfTULOjhoo0MUM28FMTtwrLeMSy/exec"
const setting = {
  "url": url,
  "method": "GET",
  "timeout": 0,
  "headers": ""
}

function formatTimeAgo(timestamp) {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);

    const timeDifference = currentDate - inputDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Diasumsikan 30 hari per bulan
    const years = Math.floor(months / 12); // Diasumsikan 12 bulan per tahun

    if (years > 0) {
        return years + (years === 1 ? " tahun yang lalu" : " tahun yang lalu");
    } else if (months > 0) {
        return months + (months === 1 ? " bulan yang lalu" : " bulan yang lalu");
    } else if (days > 0) {
        return days + (days === 1 ? " hari yang lalu" : " hari yang lalu");
    } else if (hours > 0) {
        return hours + (hours === 1 ? " jam yang lalu" : " jam yang lalu");
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? " menit yang lalu" : " menit yang lalu");
    } else {
        return "baru saja";
    }
}

$.ajax(setting).done(function (datas) {
    // console.log(datas.GoogleSheetData[1])
    const data = datas.GoogleSheetData
    // const finalArray = data.map(function () {return obj.datas.GoogleSheetData})
    function arrayColumn(array, columnName) {
      return array.map(function (value, index) {
        return value[columnName];
      })
    }
    const finalArray = arrayColumn(data, 3)
    var data_guest = ``
    for (var i = data.length - 1; i >= 1; i--) {
        data_guest += `<div class="card-body ucapan bg-light shadow p-4 m-4 rounded-4" > 
        <div class="d-flex flex-wrap justify-content-between align-items-center">
        <p class="text-dark text-truncate m-0 p-0" style="font-size: 0.95rem;"><strong class="me-1">${escapeHtml(data[i][1])}</strong>
        <img class="inlineIcon cvote" src="assets/images/love emot.png" width="20px"> ${escapeHtml(data[i][3])} </p> </div> 
        <hr class="text-dark my-1">
        <p class="text-dark mt-0 mb-1 mx-0 p-0" style="white-space: pre-line; font-size: 16px;">${escapeHtml(data[i][2])}</p>
        
        <small class="text-dark m-0 p-0" style="font-size: 0.75rem;">${formatTimeAgo(data[i][0])}<small>
        </div>`
       
    }
    $('.bwrapper-default').append(data_guest)
   
  })


const scriptURL = 'https://script.google.com/macros/s/AKfycbxZLKkOAio18qbU9V9-Du3AT5ELmfv0xBjsFCUjDMfTULOjhoo0MUM28FMTtwrLeMSy/exec'
const form = document.forms['submit-to-google-sheet']
const btnKirim = document.querySelector('.btn-kirim')
const btnLoading = document.querySelector('.btn-loading')
const bWrapper = document.querySelector('.bwrapper-default')


form.addEventListener('submit', e => {
    e.preventDefault()
    btnLoading.classList.toggle('d-none')
    btnKirim.classList.toggle('d-none')
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => {
        // console.log('Success!', response)
        btnLoading.classList.toggle('d-none')
        btnKirim.classList.toggle('d-none')
        $(".ucapan").remove();
        $('.loadlistucapan').removeClass('d-none')
        form.reset()    
        
        $.ajax(setting).done(function (datas) {
              const data = datas.GoogleSheetData
              var data_guest = '' 
              for (var i = data.length - 1; i >= 1; i--) {
                data_guest += `<div class="card-body ucapan bg-light shadow p-4 m-4 rounded-4" > 
                <div class="d-flex flex-wrap ucapan justify-content-between align-items-center">
                <p class="text-dark ucapan text-truncate m-0 p-0" style="font-size: 0.95rem;"><strong class="me-1">${escapeHtml(data[i][1])}</strong>
                <img class="inlineIcon ucapan" src="assets/images/love emot.png" width="20px"> ${escapeHtml(data[i][3])} </p> </div> 
                <hr class="text-dark my-1">
                <p class="text-dark mt-0 mb-1 mx-0 p-0 ucapan" style="white-space: pre-line; font-size: 16px;">${escapeHtml(data[i][2])}</p>
                
                <small class="text-dark m-0 p-0 ucapan" style="font-size: 0.75rem;">${formatTimeAgo(data[i][0])}<small>
                </div>`
               
            }
            $('.loadlistucapan').addClass('d-none')
            $('.bwrapper-default').append(data_guest)
            })
      })
      .catch(error => console.error('Error!', error.message))
  })