function goHome()
{
    window.location.href = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
}
