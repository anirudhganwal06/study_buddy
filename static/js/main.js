let showStudentForm = () => {
    console.log('student');
    document.getElementById('teacherContainer').style.display = 'none';
    document.getElementById('studentContainer').style.display = 'block';
    document.getElementById('studentOption').style.borderTop = '5px solid black';
    document.getElementById('studentOption').style.borderBottom = 'none';
    document.getElementById('studentOption').style.borderLeft = '5px solid black';
    document.getElementById('studentOption').style.borderRight = '5px solid black';
    document.getElementById('teacherOption').style.borderTop = 'none';
    document.getElementById('teacherOption').style.borderBottom = '5px solid black';
    document.getElementById('teacherOption').style.borderLeft = 'none';
    document.getElementById('teacherOption').style.borderRight = 'none';
    document.getElementById('studentOption').style.background = 'rgba(0, 0, 0, .24)';
    document.getElementById('teacherOption').style.background = 'none';
};

let showTeacherForm = () => {
    console.log('teacher');
    document.getElementById('teacherContainer').style.display = 'block';
    document.getElementById('studentContainer').style.display = 'none';
    document.getElementById('studentOption').style.borderTop = 'none';
    document.getElementById('studentOption').style.borderBottom = '5px solid black';
    document.getElementById('studentOption').style.borderLeft = 'none';
    document.getElementById('studentOption').style.borderRight = 'none';
    document.getElementById('teacherOption').style.borderTop = '5px solid black';
    document.getElementById('teacherOption').style.borderBottom = 'none';
    document.getElementById('teacherOption').style.borderLeft = '5px solid black';
    document.getElementById('teacherOption').style.borderRight = '5px solid black';
    document.getElementById('teacherOption').style.background = 'rgba(0, 0, 0, .24)';
    document.getElementById('studentOption').style.background = 'none';
}

function onlyLettersInName (input)
{
    var toReplace1 = /[^a-z]/gi;
    input.value = input.value.replace(toReplace1, "");
}

function checkName(x)
{
    var name = document.getElementById(x+"Name");
    var  text = document.getElementById(x+"NameText");
    
    if (name.value.length < 3)
    {
        document.getElementById(x+"NameText").style.display = "block";
    }
}

function normalName(x)
{    
    var name = document.getElementById(x+"Name");
    document.getElementById(x+"NameText").style.display = "none";
}

function onlyNumbers(input)
{
    var toReplace2 = /[^0-9]/gi;
    input.value = input.value.replace( toReplace2, "");
}

function checkNo()
{
    var roll = document.getElementById("rollNo");
    if (roll.value.length != 8)
    {
        document.getElementById("rollNoText").style.display = "block";
    }
}

function normalNo()
{
    var rollNo = document.getElementById("rollNo");
    document.getElementById("rollNoText").style.display = "none";
    document.getElementById("rollNoText").style.border = "white";

}

function checkSem()
{
    var sem = document.getElementById("semNo");
    if (sem.value.length != 1 && ( parseInt(sem.value) > 8 || parseInt(sem.value) < 1))
    {
        document.getElementById("semNoText").style.display = "block";
    }
}

function normalSem()
{
    var sem = document.getElementById("semNo");
    document.getElementById("semNoText").style.display = "none";
    document.getElementById("semNoText").style.border = "white";
}

function onlyEMail(input)
{
    var toReplace3 = /[^0-9 a-z @ .]/gi;
    input.value = input.value.replace( toReplace3, "");
}

function checkMail(x)
{
    var mail = document.getElementById(x+"Email");
    if (mail.value.indexOf('@')<=0)
    {
        document.getElementById(x+"EmailText").style.display = "block"; 
    }

    else if (mail.value.charAt(mail.value.length - 4) != '.' && mail.value.charAt(mail.value.length - 3) != '.')
    {
        document.getElementById(x+"EmailText").style.display = "block";  
    }
}

function normalMail(x)
{
    //var mail = document.getElementById("email");
    document.getElementById(x+"EmailText").style.display = "none";  
}

function checkPassword(x)
{
    var pass = document.getElementById(x+"Password");
    if( pass.value.length < 6 )
        document.getElementById(x+"PasswordText").style.display = "block";   
}

function normalPassword(x)
{
    document.getElementById(x+"PasswordText").style.display = "none";        
}

function checkConfirmPassword(x)
{
    var confirmPassword = document.getElementById(x+"ConfirmPassword");
    var password = document.getElementById(x+"Password");

    if( confirmPassword.value != password.value )
    {
        document.getElementById(x+"ConfirmPasswordText").style.display = "block";
    }
}

function normalConfirmPassword(x)
{
    document.getElementById(x+"CheckPasswordText").style.display = "none";
}