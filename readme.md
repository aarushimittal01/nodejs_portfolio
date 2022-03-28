Backend Task 
This document explains the business requirements of a portfolio tracking 
API Definitions 
Securities: A simple definition of a security is any proof of ownership or debt that has been assigned a value and may be sold. Example - Tata Consultancy Services Limited (TCS) one of the companies which became public in 2004 and investors can buy and sell shares of TCS. Currently price of 1 share (can call it quantity also) of TCS is Rs. 1,843.45. All the information is publicly available. Other listed companies - WIPRO (Wipro Limited), GODREJIND (Godrej Industries Ltd). 
Ticker Symbol: Every listed security has a unique ticker symbol, facilitating the vast array of trade orders that flow through the financial markets every day. Example - ticker for Tata Consultancy Services Limited is TCS, for Wipro Limited it is WIPRO. 
Portfolio: A portfolio is a grouping of financial assets such as stocks, bonds, commodities, currencies and cash equivalents, as well as their fund counterparts, including mutual, exchange-traded and closed funds. Example - Suppose following securities are bought - 
Ticker symbol 
Average Buy Price 
Shares
TCS 
1,833.45 
5
WIPRO 
319.25 
10
GODREJIND 
535.00 
2



The above mentioned table constitutes a portfolio. Simply put, portfolio is group of securities with each one having an average price and quantity of shares. 




Suppose 5 more shares of GODREJIND are bought at Rs 400 (this is called placing a trade in the security). Now portfolio will look like -
Ticker symbol 
Average Buy Price 
Shares
TCS 
1,833.45 
5
WIPRO 
319.25 
10


GODREJIND 
(535*2 + 400*5)/(5 + 2) 
7



Observe carefully how price of GODREJIND is a weighted average of previous average buy price and the current trade price. 
Now suppose if 5 shares of WIPRO are sold (again by placing a trade), the portfolio will look like 
Ticker symbol 
Average Buy Price 
Shares
TCS 
1,833.45 
5
WIPRO 
319.25 
5
GODREJIND 
438.57 
7



Observe carefully how average price doesn’t change after selling off a few securities. This is because selling affects your returns, not the average price of the stocks bought. 
Application Requirements - 
A portfolio tracking API needs to be implemented which allows adding/deleting/updating trades and can do basic return calculations etc. For simplicity, assume there is only one user who can have single portfolio. Basic functionality includes - 
- Adding trades for a security, and updating the portfolio accordingly. 
- Fetching portfolio: Response should include all the securities and trades corresponding to it. 
- Fetching returns: This is something new which needs explanation. Please refer to the final table above after we place sell orders for WIPRO. This API call should respond with cumulative returns at any point of time of a particular portfolio. Formula for calculating cumulative returns is 
SUM((CURRENT_PRICE[ticker] - AVERAGE_BUY_PRICE[ticker]) * 
CURRENT_QUANTITY[ticker])
So in the example, cumulative returns will be, (1843.45 - 1833.45) * 5 + (329.25 - 319.25) * 5 + (535.00 - 438.57) * 7 = Rs. 775.01. Since in API you don’t have access to current price of any security, please assume current price is always Rs. 100 for any security.
Expectations from the API: 
1. Validations like “quantity of a stock should always be positive” should be in place. 2. API routes should be well documented. 

Write code as you normally would. Things to remember - 
1. Modular code looks good. 
2. Comments help. 
Feel free to use any additional tools that help you with the task or you feel would improve the overall app. Also, please work on a brief write up detailing design decisions, tests you would run and possible improvements you would have made.


