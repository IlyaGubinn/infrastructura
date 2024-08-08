

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modal');
    var openModalBtn = document.getElementById('openModalBtn');
    var closeBtn = document.getElementsByClassName('close-btn')[0];
    var body = document.body;

    
    openModalBtn.onclick = function () {
        modal.style.display = 'block';
        document.querySelector('body').classList.toggle('hidden'); 
        
        
    }

 
    closeBtn.onclick = function () {
        modal.style.display = 'none';
        document.querySelector('body').classList.toggle('hidden'); 
    }

   
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.querySelector('body').classList.toggle('hidden');
        }
    }
});