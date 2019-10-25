const urlPaths = require(".././utils/url-paths");

const emailFooter = ` <tr>
<td height="40">
  <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>

  <p>&nbsp;</p>
</td>
</tr>
<!-- Social Media -->
<tr>
<td align="center" style="padding-bottom:0;padding-right:0;padding-left:0;padding-top:0px;" valign="middle"><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%228%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Facebook%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.facebook.com/vervewine/" target="_blank"><img alt="Facebook" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/0a1d076f825eb13bd17a878618a1f749835853a3a3cce49111ac7f18255f10173ecf06d2b5bd711d6207fbade2a3779328e63e26a3bfea5fe07bf7355823567d.png" style="border-width: 0px; margin-right: 21px; margin-left: 21px; width: 8px; height: 18px;" width="8"></a></span>
  <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2223%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Twitter%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://twitter.com/vervewine" target="_blank"><img alt="Twitter" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/6234335b200b187dda8644356bbf58d946eefadae92852cca49fea227cf169f44902dbf1698326466ef192bf122aa943d61bc5b092d06e6a940add1368d7fb71.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 23px; height: 18px;" width="23"></a></span>
  <!--[if gte mso 9]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--><span class="sg-image" data-imagelibrary="%7B%22width%22%3A%2218%22%2C%22height%22%3A18%2C%22alt_text%22%3A%22Instagram%22%2C%22alignment%22%3A%22%22%2C%22border%22%3A0%2C%22src%22%3A%22https%3A//marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png%22%2C%22link%22%3A%22%23%22%2C%22classes%22%3A%7B%22sg-image%22%3A1%7D%7D"><a href="https://www.instagram.com/vervewine/" target="_blank"><img alt="Instagram" height="18" src="https://marketing-image-production.s3.amazonaws.com/uploads/650ae3aa9987d91a188878413209c1d8d9b15d7d78854f0c65af44cab64e6c847fd576f673ebef2b04e5a321dc4fed51160661f72724f1b8df8d20baff80c46a.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 18px; height: 18px;" width="18"></a></span></td>
</tr>
<!-- whitespace -->
<tr>
<td height="25">
  <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>

  <p>&nbsp;</p>
</td>
</tr>
<!-- Footer -->
<tr>
<td style="padding-top:0;padding-bottom:0;padding-right:30px;padding-left:30px;text-align:center;Margin-right:auto;Margin-left:auto;">
  <center>
    <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">
      Probleme sau întrebări ? Contacteaza-ne la
      <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
    </p>

    <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>

  </center>
</td>
</tr>
<!-- whitespace -->
<tr>
<td height="40">
  <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>

  <p>&nbsp;</p>
</td>
</tr>`;

//sedn email to reset password  when user forgot password
module.exports.forgotPassword = (req, res, next, nodemailer, email, token) => {
  ///send email with token
  const transwerporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    from: process.env.COMPANY_NAME,
    subject: "Reseteaza parola",
    html: `
<body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">

<center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
<div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
<table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
<tbody>
<tr>
<td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
</tr>
<!-- Start of Email Body-->
<tr>
<td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">

<table style="border-spacing:0;" width="100%">
<tbody>

  <tr>
    <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
      <center>
        <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Reseteaza Parola Job App</p>
        <!--[if (gte mso 9)|(IE)]><![endif]-->

        <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align:center; background-color:rgb(255, 255, 255);">
          Primiți acest e-mail pentru că dvs. (sau altcineva) ați solicitat resetarea parolei pentru contul dvs.</span></p>
        <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align:center; background-color:rgb(255, 255, 255);">
            Faceți clic pe butonul de mai jos pentru a finaliza procesul</span></p>
        <a href="http://${req.headers.host}/api/forgot/password/reset/${token}"  target="_blank" style="border:none;  margin-bottom: 5px;text-decoration:none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block; font-size:20px;">Reseteaza Parola Aici</a> 
         <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align:center; background-color:rgb(255, 255, 255);">
              Acest link va fi valabil doar pentru o oră. Dacă nu ați solicitat acest lucru, ignorați acest e-mail și parola dvs. va rămâne neschimbată.</span></p>
      </center>
    </td>
  </tr>
</tbody>
</table>

</td>
</tr>
<!-- End of Email Body-->
<!-- whitespace -->
${emailFooter}
</tbody>
</table>
</div>
</center>
</body> `
  };

  transwerporter.sendMail(mailOptions, err => {
    if (err) {
      req.flash("error_msg", err);

      return res.redirect(urlPaths.forgotPassword);
    }
    transwerporter.close();
  });
};

///confirm that forgot password was reseted succefully
module.exports.forgotPasswordSucess = (req, res, nex, nodemailer, email) => {
  //send email that password was updated
  const transwerporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    from: process.env.COMPANY_NAME,
    subject: "Parola dvs. a fost resetata cu success",
    html: `<body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">                         
              <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                  <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                    <tbody>
                      <tr>
                        <td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
                      </tr>
                      <!-- Start of Email Body-->
                      <tr>
                        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                       
                          <table style="border-spacing:0;" width="100%">
                            <tbody>
                            
                              <tr>
                                <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                  <center>
                                    <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Parola dvs. a fost schimbată</p>
                                    <!--[if (gte mso 9)|(IE)]><![endif]-->
            
                                    <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">Aceasta este o confirmare că parola pentru contul dvs. tocmai a fost modificată</span></p>
                                    <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Daca nu a fost dvs. va rog sa ne contactati la:
                                        <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                                      </p>
                      
                                      <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>
                                  
                                    <!-- <button style="border: none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block;">Reset password</button> -->
                                  </center>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                       
                        </td>
                      </tr>
                      <!-- End of Email Body-->
                      ${emailFooter}
                    </tbody>
                  </table>
                </div>
              </center>
            </body>`
  };

  transwerporter.sendMail(mailOptions, err => {
    if (err) {
      req.flash("error_msg", err);
      return res.redirect(urlPaths.forgotPassword);
    }
    transwerporter.close();
  });
};

//change password in profile

module.exports.changePasswordProfile = (req, res, next, nodemailer, email) => {
  const transwerporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    from: process.env.COMPANY_NAME,
    subject: "Parola dvs. a fost schimbată",
    html: ` <body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
      <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
        <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
          <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
            <tbody>
              <tr>
                <td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
              </tr>
              <!-- Start of Email Body-->
              <tr>
                <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
               
                  <table style="border-spacing:0;" width="100%">
                    <tbody>
                    
                      <tr>
                        <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                          <center>
                            <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Parola dvs. a fost schimbată</p>
                            <!--[if (gte mso 9)|(IE)]><![endif]-->
    
                            <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">Aceasta este o confirmare că parola pentru contul dvs. tocmai a fost modificată</span></p>
                            <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Daca nu a fost dvs. va rog sa ne contactati la:
                                <nobr><a class="tel" href="tel:2128102899" style="color:#a1a8ad;text-decoration:none;" target="_blank"><span style="white-space: nowrap">212.810.2899</span></a></nobr>
                              </p>
              
                              <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">or email <a href="mailto:hello@vervewine.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">hello@mail.com</a></p>
                          
                            <!-- <button style="border: none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block;">Reset password</button> -->
                          </center>
                        </td>
                      </tr>
                    </tbody>
                  </table>
               
                </td>
              </tr>
              <!-- End of Email Body-->
              ${emailFooter}
            </tbody>
          </table>
        </div>
      </center>
    </body>`
  };

  transwerporter.sendMail(mailOptions, err => {
    if (err) {
      req.flash("error_msg", err);
    }
    transwerporter.close();
  });
};

//check email after user signup
module.exports.checkEmailAfterSignUp = (req, res, nodemailer, email, token) => {
  ///send email with token
  const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    from: process.env.COMPANY_NAME,
    subject: "Verificare Email",
    html: `            
<body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">                        
<center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
<div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
<table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
<tbody>
<tr>
  <td align="center"><h1 style="color:white;background: red; padding: 20px 0; margin: 50px; width:100px">JOB APP</h1></td>
</tr>
<!-- Start of Email Body-->
<tr>
  <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
  
    <table style="border-spacing:0;" width="100%">
      <tbody>                  
        <tr>
          <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
            <center>
              <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Verificarea Email</p>
              <!--[if (gte mso 9)|(IE)]><![endif]-->

              <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;"><span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">
                Va multumim pentru că  va-ați înregistrat pe saitul nostru.</br>
                Faceți clic pe buttonul  de mai jos  pentru a finaliza procesul:
              </span></p>
              <a  href="http://${req.headers.host}/api/email/verify/${token}" style="border: none; color:white; background-color:#2196F3 ;padding:14px 60px;cursor: pointer; display: inline-block; text-decoration:none;">Confirma Email</a> 
              <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Dacă nu ați solicitat acest lucru, ignorați acest e-mail si raportați. 
               </p>
            </center>
          </td>
        </tr>
      </tbody>
    </table>   
  </td>
</tr>
<!-- End of Email Body-->
${emailFooter}
</tbody>
</table>
</div>
</center>
</body>`
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      req.flash("error_msg", err);

      return res.redirect(urlPaths.back);
    }
    transwerporter.close();
  });
};
