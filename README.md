# nativefier-internet-access-checker
Checks for internet connection in your Nativefier application and throws a notification when there is no internet access.

1. Create an empty, accessible web page on your website or on any other server that is online. This page should have the CORS header set to allow your Nativefier application fetch it. Remember that no content is needed on the page. The goal is just to test if the fetch will get a successful (200) header response.

2. Get [internetchecker.js](https://github.com/preciousfocus/nativefier-internet-access-checker/blob/main/internetchecker.js) and replace the following at line 45 with the URL to your online empty page.
`"https://url_to_an_empty_page_on_your_website_with_CORS_header_set_to_*"`

3. Inject the JS file into your application using the Nativefier's  `--inject`

4. Done. Build and test your application with internet connection turned off.


![screenshot of sample](https://github.com/preciousfocus/nativefier-internet-access-checker/blob/main/no-internet-screenshot.png)
