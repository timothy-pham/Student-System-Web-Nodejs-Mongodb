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
            imageNew = ''
            if (post.image) {
                imageNew = `<img class="image" src="${post.image}">`;
            }
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
                    <input type="text" id="id${post._id}">
                    <button onclick="unEditPost('${post._id}')" id="id${post._id}"
                        >Huỷ</button>
                </div>
                <div class="caption-right">
                    <div class="my-2 mx-2" role="group"
                    aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-warning" onclick="editPost('${post._id}')">Sửa</button>
                      <button type="button" class="btn btn-danger" onclick="deletePost('${post._id}')">Xoá</button>
                </div>

                                                    </div>
            </div>
            <div class="attach">
                <div class="video">
                ${post.video}
                </div>`;

            var newPost2 = `</div>
            <div class="commentOfPost">
                                                    <div class="newComment mx-5 d-flex">
                                                        <input class="form-control" type="text" id="id${post._id}"
                                                            placeholder="Viết bình luận...">
                                                        <button class="btn btn-primary mx-2 "
                                                            onclick="addComment('${post._id}')">Gửi</button>
                                                    </div>
                                                    <div class="showComment py-2" id="${post._id}">
                                                        <div class="after-add-comment" id="id${post._id}">
                                                        </div>
                                                            
                                                    </div>
                                                </div>`
            var finalPost = newPost + imageNew + newPost2
            var curHtml = $('.newPost').html()
            $('.newPost').html(finalPost + curHtml)
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
    $(`.caption-left p#id${id}`).css("display", "block")
    $(`.caption-left input#id${id}`).css("display", "none")
    $(`.caption-left button#id${id}`).css("display", "none")
}
function editPost(id) {
    //focus edit
    $(`.caption-left input#id${id}`).val($(`p#id${id}`).html().trim())
    $(`.caption-left p#id${id}`).css("display", "none")
    $(`.caption-left input#id${id}`).css("display", "block")
    $(`.caption-left button#id${id}`).css("display", "block")
    $(`.caption-left input#id${id}`).focus();
    //unfocus

    //Enter sau khi edit
    $(`.caption-left input#id${id}`).on('keyup', function (e) {
        if (e.keyCode === 13) {
            confirmEditPost(id)
        }
    });
}
function confirmEditPost(id) {
    $.ajax({
        url: '/updateCaption',
        type: 'put',
        data: {
            _id: id,
            caption: $(`input#id${id}`).val()
        }
    }).then(data => {
        if (data.success) {
            $(`p#id${id}`).html($(`input#id${id}`).val())
            $(`p#id${id}`).css("display", "")
            $(`button#id${id}`).css("display", "none")
            $(`input#id${id}`).css("display", "none")
        } else {
            alert(data.msg)
        }
    }).catch(err => {
        console.log(err)
    })
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
                $(`.post#id${id}`).remove();
            } else {
                alert("Xoá bài viết thất bại")
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

//add a notification
var socket = io();
function addNotification() {
    var title = $('#notiTitle').val()
    var summary = $('#notiSummary').val()
    var detail = $('#notiDetail').val()
    var permission = $('#permission').val()

    if (permission === '1') {
        alert("Bạn chưa chọn chuyên mục nào")
    } else {
        $.ajax({
            url: '/addNotification',
            type: 'post',
            data: {
                title: title,
                summary: summary,
                detail: detail,
                permission: permission
            }
        }).then(data => {
            if (data.success) {
                //thông báo realtime
                $('#notiTitle').val('')
                $('#notiSummary').val('')
                $('#notiDetail').val('')
                $('#permission option[value="1"]').attr('selected', 'selected');
                socket.emit('notification', {
                    title: data.notiResult.title,
                    category: data.notiResult.category
                });

                socket.on('notification', function (notification) {
                    console.log(notification)
                    var html = `<div class="card">
                    <div class="card-header">
                        Thông báo
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>${notification.category} đã đăng 1 thông báo</p>
                            <footer class="blockquote-footer">${notification.title}
                            </footer>
                        </blockquote>
                    </div>
                </div>`
                    $('.new-notification').html(html)
                    setTimeout(function () {
                        $('.new-notification').html('')
                    }, 3000);
                });
            } else {
                alert(data.msg)
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

//Add new comment
function addComment(id) {
    if ($(`.newComment input#id${id}`).val()) {
        $.ajax({
            url: '/addComment',
            type: 'post',
            data: {
                postId: id,
                comment: $(`.newComment input#id${id}`).val(),
            }
        }).then(data => {
            if (data.success) {
                $(`.newComment input#id${id}`).val('')
                let commentData = data.newComment
                let html = `<div class="comment p-1"
                id="id${commentData._id.toString()}">
                <div
                    class="comment-content border border-2 mt-2 mx-2 p-2 bg-light rounded-3">
                    <div class="comment-content-header d-flex">
                        <p class="fw-bolder my-0 fs-6">
                            ${commentData.fullname}
                        </p>
                        <span class="time m-1 mb-0">
                            ${commentData.createTime}
                        </span>
                        <div class="d-flex tool-comment">
                            <button
                                class="font-monospace mx-2 link-info bg-white p-0.5 border border-2 rounded-3"
                                onclick="editComment('${commentData._id.toString()}')">
                                Sửa
                            </button>
                            <button
                                class="font-monospace link-danger bg-white p-0.5 border border-2 rounded-3"
                                onclick="deleteComment('${commentData._id.toString()}')">
                                Xoá
                            </button>
                        </div>
                    </div>
                    <p class="comment-detail fs-6 my-0"
                        id="id${commentData._id.toString()}">
                        ${commentData.comment}
                    </p>
                    <input type="text"
                        id="id${commentData._id.toString()}">
                    <div class="button-confirm d-flex">
                        <button
                            onclick="unEditComment('${commentData._id.toString()}')"
                            id="id${commentData._id.toString()}"
                            class="m-2 btn-danger">Huỷ</button>
                        <button
                            onclick="confirmEditComment('${commentData._id.toString()}')"
                            id="id${commentData._id.toString()}"
                            class="m-2 btn-success">Lưu</button>
                    </div>
                </div>
            </div>`
                let oldHtml = $(`.after-add-comment#id${id}`).html()
                $(`.after-add-comment#id${id}`).html(html + oldHtml)
            } else {
                alert(data.msg)
            }
        }).catch(err => {
            console.log(err)
        })
    } else {
        alert("Bạn chưa nhập gì")
    }

}

function unEditComment(id) {
    $(`.comment-content p#id${id}`).css("display", "block")
    $(`.comment-content input#id${id}`).css("display", "none")
    $(`.comment-content button#id${id}`).css("display", "none")
}
function editComment(id) {
    $(`.comment-content input#id${id}`).val($(`.comment-content p#id${id}`).html().trim())
    $(`.comment-content p#id${id}`).css("display", "none")
    $(`.comment-content input#id${id}`).css("display", "block")
    $(`.comment-content button#id${id}`).css("display", "block")

    $(`.comment-content input#id${id}`).on('keyup', function (e) {
        if (e.keyCode === 13) {
            confirmEditComment(id)
        }
    });
}
function confirmEditComment(id) {
    $.ajax({
        url: '/updateComment',
        type: 'put',
        data: {
            _id: id,
            comment: $(`.comment-content input#id${id}`).val()
        }
    }).then(data => {
        if (data.success) {
            $(`.comment-content p#id${id}`).html($(`.comment-content input#id${id}`).val())
            $(`.comment-content p#id${id}`).css("display", "")
            $(`.comment-content button#id${id}`).css("display", "none")
            $(`.comment-content input#id${id}`).css("display", "none")
        } else {
            alert(data.msg)
        }
    }).catch(err => {
        console.log(err)
    })
}

//delete comment
function deleteComment(id) {
    let result = confirm("Bạn chắc chắn muốn xoá bình luận này chứ?");
    if (result === true) {
        $.ajax({
            url: '/deleteComment',
            type: 'delete',
            data: {
                _id: id,
            }
        }).then(data => {
            if (data.success) {
                $(`.comment#id${id}`).remove();
            } else {
                alert("Xoá bình luận thất bại")
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
//----------INDEX-POST-END