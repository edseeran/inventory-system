function notifToggle() {
    const notifmenu = document.querySelector('.notif-menu');
    notifmenu.classList.toggle('active');
}

/***************************************************************** */

function profToggle() {
    const profMenu = document.querySelector('.prof-menu');
    profMenu.classList.toggle('active');
}

/***************************************************************** */

$('.list-group-item').on('click', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('.tab-pane').removeClass('show active');
    $(target).addClass('show active');
})