POST /emails

body:

{

	"name": the faux username ("@emailnobody.com") the user inputs to the name text field; String,
	"subject": the subject the user inputs to the subject text field; String,
	"body": the body the user inputs to the body text field; String
	
}

returns: emailid (the id of the email posted; int)


GET /emails/{emailid}

returns:

{

	"emailid": the id of the email; int,
	"sent": the moment the email was sent; datetime,
	"name": the faux username ("@emailnobody.com") the user inputs to the name text field; String,
	"subject": the subject the user inputs to the subject text field; String,
	"body": the body the user inputs to the body text field; String
	
}


GET /emails/count

returns: count (the number of emails in the database; int)