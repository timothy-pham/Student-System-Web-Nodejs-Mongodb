//----------LOGIN
function login() {
    $.ajax({
        url: '/login',
        type: 'post',
        data: {
            username: $('#username').val(),
            password: $('#password').val(),
        }
    }
    ).then(data => {
        setCookie('token', data.token, 1);
        window.location.href = "/"
    }).catch(err => {
        console.log(err)
    })
}

function google() {
    window.setTimeout(function () {
        window.location.href = '/';
    }, 5000);
}

function logout() {
    $.ajax({
        url: '/logout',
        type: 'get',
    }
    ).then(data => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/"
    }).catch(err => {
        console.log(err)
    })
}

//Get Set cookies
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//----------LOGIN END

//----------ADMIN

function createAccount() {
    var checkedValue = document.getElementsByName('permission');
    var permission = []
    for (var i = 0; i < checkedValue.length; i++) {
        if (checkedValue[i].checked) {
            permission.push(checkedValue[i].value)
        }
    }

    $.ajax({
        url: '/admin/register',
        type: 'post',
        data: {
            fullname: $('#fullname').val(),
            username: $('#username').val(),
            password: $('#password').val(),
            permission: JSON.stringify(permission)
        }
    }).then(data => {
        if (data.success) {
            alert("Tạo tài khoản thành công")
            window.location.href = "/admin"
        } else {
            alert("Tạo tài khoản thất bại")
        }
    }).catch(err => {

        console.log(err)
    })
}

//dropdown box
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
//----------ADMIN END

//----------Manager
function changePassword() {
    $.ajax({
        url: '/manager/changePassword',
        type: 'put',
        data: {
            password: $('#password').val(),
        }
    }).then(data => {
        if (data.success) {
            alert("Đổi mật khẩu thành công")
            window.location.href = "/manager"
        } else {
            alert("Đổi mật khẩu thất bại")
        }
    }).catch(err => {
        console.log(err)
    })
}
//----------Manager END

//----------STUDENT
//update ảnh
//update thông tin
function updateStudent() {
    $.ajax({
        url: '/student/updateStudent',
        type: 'put',
        data: {
            fullname: $('#fullname').val(),
            class: $('#class').val(),
            falcuty: $('#falcuty').val()
        }
    }).then(data => {
        if (data.success) {
            alert("Cập nhật thông tin thành công")
            window.location.href = "/student"
        } else {
            alert("Cập nhật thông tin thất bại")
        }
    }).catch(err => {
        console.log(err)
    })
}
//----------STUDENT END

//----------INDEX-POST

//add a post
function addPost() {
    var caption = $('#caption').val();
    var video = $('#video').val();
    var image = document.getElementById("image").files;

    var formData = new FormData();
    formData.append('caption', caption);
    formData.append('video', video);
    formData.append('image', image[0])

    $.ajax({
        url: '/addPost',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
    }).then(data => {
        if (data.success) {
            //off preview
            $('#caption').val('')
            $('#video').val('');
            $('#image').val('');
            $('#previewVideo').html('')

            $('#imagePreview').css("display", "none")
            $('#imagePreview').attr("src", "")
            let post = data.postResult
            //add post nhưng ko refesh
            var newPost = `<div class="post" id="id${post._id}">
            <div class="postOf">
                <p>
                    ${post.fullname} 
                </p>
            </div>
            <div class="caption">
                <div class="caption-left">
                    <p id="id${post._id}" class="caption">
                        ${post.caption}
                    </p>
                    <input type="text" id="id${post._id}" style="display:none">
                    <button onclick="unEditPost('${post._id}')" id="id${post._id}"
                        style="display: none;">Huỷ</button>
                </div>
                <div class="caption-right">
                    
                        <button onclick="editPost('${post._id}')">Sửa</button>
                        <button onclick="deletePost('${post._id}')">Xoá</button>

                </div>
            </div>
            <div class="attach">
                <div class="video">
                ${post.video}
                </div>
                <img class="image" src="${post.image}">
            </div>
            <div class="commentOfPost">
                <div class="newComment">
                    <textarea id="newComment" cols="50" rows="1"></textarea>
                </div>
                <div class="showComment">
                    Xinh đẹp tuyệt vời
                </div>
            </div>
        </div>`
            var curHtml = $('.newPost').html()
            $('.newPost').html(newPost + curHtml)
        } else {
            alert(data.msg)
        }
    }).catch(err => {
        console.log(err)
    })
}
function previewImage(self) {
    var file = self.files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            document.getElementById("imagePreview").style.display = "";
            document.getElementById("imagePreview").setAttribute("src", event.target.result);
        }
        fileReader.readAsDataURL(file[0]);
    }
}
function previewVideo() {
    let url = document.getElementById("video").value;
    html = checkYoutubeUrl(url)
    document.getElementById('previewVideo').innerHTML = html
}

function checkYoutubeUrl(url) {
    if (url.includes("https://www.youtube.com/embed/")) {
        var html = '<iframe width="560" height="315" src="' + url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        return html;
    } else {
        if (url.includes("&list=")) {
            var idVideos = url.split("v=");
            var idVideoList = idVideos[idVideos.length - 1];
            idVideos = idVideoList.split("&list=")
            var idVideo = idVideos[0];

            url = "https://www.youtube.com/embed/" + idVideo;
            var html = '<iframe width="560" height="315" src="' + url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            return html;
        } else {
            if (url.includes("https://www.youtube.com/watch?v=")) {
                var idVideos = url.split("v=");
                var idVideo = idVideos[idVideos.length - 1]

                url = "https://www.youtube.com/embed/" + idVideo;
                var html = '<iframe width="560" height="315" src="' + url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                return html;
            }
            else {
                return '';
            }
        }
    }
}

//add a post end

//edit and delete a post
function unEditPost(id) {
    $(`p#id${id}`).css("display", "block")
    $(`input#id${id}`).css("display", "none")
    $(`button#id${id}`).css("display", "none")
}
function editPost(id) {
    //focus edit
    $(`input#id${id}`).val($(`p#id${id}`).html().trim())
    $(`p#id${id}`).css("display", "none")
    $(`input#id${id}`).css("display", "block")
    $(`button#id${id}`).css("display", "block")
    $(`input#id${id}`).focus();
    //unfocus

    //Enter sau khi edit
    $(`input#id${id}`).on('keyup', function (e) {
        if (e.keyCode === 13) {

            $.ajax({
                url: '/updateCaption',
                type: 'put',
                data: {
                    _id: id,
                    caption: $(`input#id${id}`).val()
                }
            }).then(data => {
                if (data.success) {
                    alert("Chỉnh sửa bài viết thành công")
                    $(`p#id${id}`).html($(`input#id${id}`).val())
                    $(`p#id${id}`).css("display", "")
                    $(`input#id${id}`).css("display", "none")
                } else {
                    alert(data.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    });
}

function deletePost(id) {
    let result = confirm("Bạn chắc chắn muốn xoá bài viết này chứ?");
    if (result === true) {
        $.ajax({
            url: '/deletePost',
            type: 'delete',
            data: {
                _id: id,
            }
        }).then(data => {
            if (data.success) {
                alert("Xoá bài viết thành công")
                $(`.post#id${id}`).remove();
            } else {
                alert("Xoá bài viết thất bại")
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
//----------INDEX-POST-END