let password = '';
let confirm_password = '';

document.getElementById("password").addEventListener('change',function(e){
    // check if the password has 6 or more chars.
    if(e.target.value.length >= 6){
        password = e.target.value;
        document.getElementById('password-helper-text').style.display = 'none';
    }else{
        this.classList.add('has-danger');
        document.getElementById('password-helper-text').innerHTML = 'Password must be at least six characters';
    }
});

document.getElementById("confirm_password").addEventListener('change',function(e){
    if(e.target.value.length >= 6){
        if(e.target.value == password){
            confirm_password = e.target.value;
            document.getElementById('confirm_password-helper-text').style.display = 'none';
        }else{
            document.getElementById('confirm_password-helper-text').innerHTML = 'Password do not match';
        }
    }else{
        this.classList.add('has-danger');
        document.getElementById('confirm_password-helper-text').innerHTML = 'Password must be at least six characters';
    }
});

document.getElementById('submit-btn').addEventListener('click', async function(e){
    e.preventDefault();
    if(password && confirm_password){
        let code = (new URL(location)).searchParams.get('code');
        try{
             // send the request for resetting the password....
            await fetch('http://192.168.115.143:1337/api/auth/reset-password',{
                code,
                password,
                passwordConfirmation:confirm_password
            });

            // everything is okay.
            document.getElementById('form-error').style.display = 'none';
            document.getElementById('form-success').innerHTML = "Password has been successfully set";

        }catch(error){
            document.getElementById('form-success').style.display = 'none';
            document.getElementById('form-error').innerHTML = error.response.data.error.message;
        }
    }else{
        document.getElementById('form-success').style.display = 'none';
        document.getElementById('form-error').innerHTML = "All fields are required";
    }
});