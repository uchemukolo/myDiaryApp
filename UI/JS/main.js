body {
    margin: 10px 10px 10px 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

  }
  .background {
    background-size: cover;
    background-image: url("../images/background-cement-concrete-242236.jpg");
    background-repeat: no-repeat;
    height: 100%;
  }
  /* Naigation*/
  .topnav {
    overflow: hidden;
    background-color: #333;
  }

  .topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  
  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }
  
  .active {
    background-color: #2eb2ff;
    color: white;
  }
  
  .topnav .icon {
    display: none;
  }
  
  @media screen and (max-width: 600px) {
    .topnav a:not(:first-child) {display: none;}
    .topnav a.icon {
      float: right;
      display: block;
    }
  }
  
  @media screen and (max-width: 600px) {
    .topnav.responsive {position: relative;}
    .topnav.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .topnav.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
  }

/* index page */
.button {
    align-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #2eb2ff;
    border: none;
    color: #ffffff;
    justify-content: center;
    text-align: center;
    font-size: 28px;
    padding: 20px;
    width: 300px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px 0px 20px 0px;
  }

  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  .button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;

  }

  .button:hover span {
    padding-right: 25px;
  }

  .button:hover span:after {
    opacity: 1;
    right: 0;
  }
  .container {
    padding: 10px;
    flex: 1 100%;
    justify-content: center;
}
.container-entry {
    align-content: center;
    align-items: center;
    display: block;
    border: 2px solid #d7e5f3;
    border-radius: 5px;
    background-color: #ffffff;
    height: 100%;
    justify-content: center;
    margin: 40px auto;
    margin-bottom: 100px;
    padding: 0px auto;
    width: 70%;

}
.container-entry-detail {
    align-items: center;
    justify-content: center;
    background-color: #f8f2f2;
    height: 100%;
    margin: 40px auto;
    margin-bottom: 100px;
    padding: 20px 20px 20px 20px;
    width: 70%;
}
.container-signup {
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-flex-flow: row wrap;
    lex-wrap: wrap;
    justify-content: center;
    margin: 25px auto;
    text-align: center;
  }
  .container_signin {
    text-align: center;
    display: block;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-flex-flow: row wrap;
    flex-wrap: wrap;
    justify-content: center;
    margin: 60px auto;
    padding: 25px 0px 25px 0px;

  }
  .container-entries {
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-flex-flow: row wrap;
    justify-content: center;
    border: 2px solid #d7e5f3;
    border-radius: 5px;
    background-color: #ffffff;
    color: black;
    height: 100%;
    margin: 40px auto;
    margin-bottom: 100px;
    padding: 20px auto;
    width: 70%;
}
.container-note {
    padding: 20px;
    background-color: #f1f1f1;
    display: block;
}
.col-25 {
    float: left;
    width: 10%;
    padding: 10px 10px 20px 10px;
}
.col-75 {
    float: left;
    width: 80%;
    padding: 10px 10px 20px 10px;

}

#entry {
    border-bottom: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5px auto;
    padding: 10px 20px 20px 10px;
    resize: vertical;
    width: 80%;
  }
  #email {
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5px auto;
    padding: 10px 20px;
    resize: vertical;
    width: 300px;
  }
  .entry-div {
    font-weight: bold;
    text-align: center;
}
.entry-list  {
    display: block;
    align-items: center;
    margin: auto;
    padding:0px auto;
    text-align:center;
    width: 100%;
}

.firstimg {
    margin: 0 auto;
    max-width: 100%;
    display: flex;
}
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #333;
    color: white;
    padding: 5px;
    text-align: center;
  }
  #form {
    border: 3px solid #f1f1f1;

}
  .header {
    overflow: hidden;
    margin-right: 0px;
  }
  .headline {
    align-items: center;
    background-color: transparent;
    color: #ffffff;
    height: 20vh;
    margin: 10px auto;
    padding: 20px 0px 0px 20px;
    width: 60vw;
    text-align: center;
    text-emphasis: strong;

}

* {
    /* Calculation */
    --diff: calc(var(--max-size) - var(--min-size));
    --responsive: calc((var(--min-size) * 1px) + var(--diff) * ((100vw - 420px) / (1200 - 420))); /* Ranges from 421px to 1199px */
  }

  h1 {
    --max-size: 50;
    --min-size: 25;
    font-size: var(--responsive);
  }

  h2 {
    --max-size: 40;
    --min-size: 20;
    font-size: var(--responsive);
  }
  h3 {
    --max-size: 30;
    --min-size: 15;
    font-size: var(--responsive);
  }
  h4 {
    --max-size: 25;
    --min-size: 15;
    font-size: var(--responsive);
  }

p {
   font-size:14px;
}

input[name=name], input[name=mail] {
    width: 100%;
    padding: 5px;
    margin: 8px 0;
    display: block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
input[type=checkbox] {
    margin-top: 16px;

}
input[type=text], select, textarea, password, email {

    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5px auto;
    padding: 10px 20px;
    resize: vertical;
    width: 300px;
  }
input[type=submit] {
    background-color: #2eb2ff;
    border: none;
    border-radius: 4px;
    color: #000000;
    cursor: pointer;
    margin: 5px auto;
    padding: 12px 20px;
  }

  input[type=submit]:hover {
    background-color: grey;
    color: #000000;
  }

  .input_field {
    float: left;
    margin-top: 6px;
    margin: auto;
    width: 100%;
  }

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.logo {
    float: left;
    position: relative;
    margin-left: 6px;
    max-width: 100%;
    height: auto;
}
.main {
    border: 2px solid #d7e5f3;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat, repeat;
    background-image: url("../images/background1.png"), url("../images/pexels-photo-880687.jpeg");
    background-blend-mode: overlay;
    color: #ffffff;
    height: 50vh;
    justify-content: center;
    margin: 30px auto;
    padding: 20px 20px 20px 0px;
    width: 90%;
    text-align: center;
    text-emphasis: strong;

}

.main-logout {
    align-items: center;
    color: #000000;
    margin-top: 40px;
    text-align: center;

}
.main-signup-button {
 justify-content: center;
 margin-top: 10PX;
    margin-bottom: 50px;
    padding: 0px 0px 30px 0px;
    width: 100%;
    text-align: center;

}

.main-pic {
    display: flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-flex-flow: row wrap;
    justify-content: center;
    border: 2px solid #d7e5f3;
    border-radius: 5px;
    background-color: #fdfafa;
    color: black;
    float: left;
    height: 100%;
    margin: 0px 0px 0px 30px;
    padding: 0px auto;

}

.main a{
    text-decoration: none;
    color: white;
}
/* The Modal (background) */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #000000;
    background-color: #00000066;
}

/* Modal Content */
.modal-content {
    background-color: #ffffff;
    margin: auto;
    padding: 10px;
    border: 2px solid #d7e5f3;
    width: 50%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000000;
    text-decoration: none;
    cursor: pointer;
}
#mood {
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5px auto;
    padding: 10px 20px;
    resize: vertical;
    width: 50%;
  }
  #myBtn {
    background-color: #2eb2ff;
    border: none;
    border-radius: 10px;
    margin: 5px 0px 20px 0px;
    color: #ffffff;
    font-size: 20px;
    padding: 20px auto;

  }
  #myBtn:hover {
    background-color: #ffffff;
    color:#2eb2ff;
    cursor: pointer;
  }

.new_entry {
    text-align: center;
    margin: 10px 0px 0px 10px;

}
.or {
    display: block;
    text-align: center;
    text-decoration: none;
}

  #pword {
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5px auto;
    padding: 10px 20px;
    resize: vertical;
    width: 300px;
  }

.pagination {
    display: inline-block;
    margin: 0px auto;


}

.pagination a {
    border: 1px solid #cecaca;
    color: 000;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
}

.pagination a.active {
    background-color: #2eb2ff;
    border: 1px solid #cecaca;
    color: #fff;
}
@media only screen and (max-width:700px) {
    /* For mobile phones: */
    .container-entries, .main-reminder {
      width:100%;
    }
  @media screen and (max-width: 700px) {
    .row {
        flex-direction: column;
    }
}
  }

.row {
    display: flex;
    flex-wrap: wrap;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

  #title {
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 5px auto;
    padding: 10px 20px;
    resize: vertical;
    width: 50%;
  }
table {
    border-collapse: collapse;
    margin-top:7px;
    margin-bottom: 7px;
    margin-left: 4px;
    margin-right: 4px;
    padding:0px 20px 20px 20px;
    text-align:left;
    text-decoration: none;
    width: 100%;
}
td, th {
    border-bottom: 2px solid #cdd2d4;
    text-align: left;
    text-decoration: none;
    padding: 8px;
}
.welcome {
    text-align: center;
}

  @media screen and (max-width: 600px) {
    .input_field, .col, table,  input[type=submit] {
      margin-top: 0;
      width: 100%;
      }
    }


/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
    .col-25, .col-75, .col-25a, .col-75a, input[type=submit] {
        width: 100%;
        margin-top: 0;
    }
}
@media only screen and (max-width: 320px) {

    body { 
       font-size: 2em; 
    }

 }
