exports.contactUsEmail = (
    email,
    message,  
  ) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message">Contact Form Response from ServiceHub</div>
            <div class="body">
                <p>Got the following message from servicehub.
                </p>
                <p>Here are the mail and message provided by user</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
            </div>
        </div>
    </body>
    </html>`
  }