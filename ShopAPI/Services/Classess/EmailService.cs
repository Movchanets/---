using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;

namespace Services.Classess;

public class EmailService: IEmailService
{
    private IConfiguration _configuration;
    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        // get settings
        string fromEmail = _configuration["EmailSettings:User"];
        string SMTP = _configuration["EmailSettings:SMTP"];
        int PORT = Int32.Parse(_configuration["EmailSettings:PORT"]);
        string password = _configuration["EmailSettings:Password"];

        // set email 
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(fromEmail));
        email.To.Add(MailboxAddress.Parse(toEmail));
        email.Subject = subject;

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.HtmlBody = body;

        email.Body = bodyBuilder.ToMessageBody();

        // send email
        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(SMTP, PORT, SecureSocketOptions.SslOnConnect);
        await smtp.AuthenticateAsync(fromEmail, password);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }
}