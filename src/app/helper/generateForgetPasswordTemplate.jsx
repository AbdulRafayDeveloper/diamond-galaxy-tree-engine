const generateForgetPasswordTemplate = (name, otp) => ` 
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset - Daimond Galaxy</title>
    </head>
    <body style="font-family: 'Segoe UI', sans-serif; background-color: #f8f9fa; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid #e5e5e5; overflow: hidden;">

        <!-- Header -->
        <div style="background-color: #22405c; color: #ffffff; padding: 30px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Daimond Galaxy</h1>
          <p style="margin: 8px 0 0; font-size: 16px;">Secure Password Reset</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px 25px; background-color: #ffffff;">
          <p style="font-size: 16px; margin: 0 0 15px;">Hello <strong>${name}</strong>,</p>

          <p style="font-size: 16px; margin: 0 0 15px;">
            We received a request to reset the password for your Daimond Galaxy account. To proceed, please use the OTP code below:
          </p>

          <div style="text-align: center; margin: 35px 0;">
            <span style="font-size: 38px; font-weight: bold; color: #22405c; letter-spacing: 3px;">${otp}</span>
          </div>

          <p style="font-size: 15px; margin: 0 0 10px;">
            If you did not request this change, you can safely ignore this email. Your account will remain secure and no changes will be made.
          </p>

          <p style="font-size: 15px; margin: 0 0 10px;">
            This code is only valid for a limited time, so please complete the reset process promptly.
          </p>

          <p style="font-size: 15px; margin: 20px 0 0;">Warm regards,<br /><strong>Daimond Galaxy Support Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background-color: #22405c; color: #ffffff; text-align: center; padding: 20px; font-size: 13px;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} HouseHub365. All rights reserved.</p>
          <p style="margin: 5px 0 0;">Delivering modern living solutions with care.</p>
        </div>
      </div>
    </body>
  </html>
`;

export default generateForgetPasswordTemplate;
