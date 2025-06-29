const generateEmailVerificationTemplate = (name, verifyLink) => ` 
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #ECECEC; color: #595959;">
      <div style="width: 100%; max-width: 600px; margin: 20px auto; padding: 0; background-color: #ffffff; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">

        <!-- Header -->
        <div style="background-color: #22405c; color: #fff; text-align: center; padding: 20px;">
          <h1 style="margin: 0;">Diamond Galaxy</h1>
          <div style="font-size: 16px;">Verify Your Email</div>
        </div>

        <!-- Body -->
        <div style="padding: 30px; background-color: #f9f9f9; font-size: 16px; line-height: 1.8;">
          <p style="margin: 0 0 15px;">Hi <strong>${name}</strong>,</p>
          <p style="margin: 0 0 15px;">Thank you for joining <strong>Diamond Galaxy</strong>, the leading MLM system empowering your success.</p>
          <p style="margin: 0 0 15px;">To complete your registration and activate your account, please verify your email by clicking the button below:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyLink}" target="_blank" style="display: inline-block; padding: 12px 25px; font-size: 16px; font-weight: bold; color: white; background-color: #22405c; border-radius: 5px; text-decoration: none;">
              Verify Email
            </a>
          </div>

          <p style="margin: 0 0 15px;">If you did not sign up for Diamond Galaxy, please ignore this email.</p>

          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 0;">The Diamond Galaxy Team</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #22405c; text-align: center; padding: 20px; font-size: 14px; color: #ECECEC;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Diamond Galaxy. All rights reserved.</p>
          <p style="margin: 0;">Empowering you to grow and achieve more with our MLM system.</p>
        </div>

      </div>
    </body>
  </html>
`;

export default generateEmailVerificationTemplate;
