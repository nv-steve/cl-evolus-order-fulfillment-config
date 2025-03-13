# Sales Order Fulfillment Configuration

## Overview
At this time, Evolus has two domestic UPS 3Pl facilities as well as a single EU facility. The US facilities need to 
have orders routed to them based on the destination State. The EU 3PL needs to have different service types (i.e., 
Shipping Methods) based on the destination, the product catalog and the customer type. These requirements are likely to 
become more complex and varied as time goes on.

A system was required to configure Sales Orders with these various parameters so they can be dispatched to the correct 
facilities and fulfilled correctly.

## Solution
This is a V1, MVP level solution for this requirement. A NetSuite record ("") will model the criteria and applicable 
configuration values. For example, these records have Country, State, Customer Type, Product Catalog, Fulfillment 
Location and Shipping Item as fields. Hopefully this schema will hold up over time.

### Workflow
A simple WorkFlow will run and determine if an order should be processed or not. Not all Sales Orders will require 
processing and it's best to have these criteria defined in a WF rather than in a script.

The workflow does most of it's work with a customer Workflow Action Script (contained in this project). This script 
will identify the applicable configuration rules and update the Sales Order with the rules parameters.

### Customers
This was a late entry requirement. Apparently some EU customers will require specific configuration, just for their 
orders. A Customer List/Record field was added and the system will heavily bias it's rule selection to any rules that 
match the Customer on the order.