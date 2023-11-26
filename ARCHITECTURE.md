# Architecture

The code is splited by ""domain"". Each domain have :

## Controller

Contain route and service call. It handle everyhing between the Http and the
business logic, include:

- Routing
- request body/params retrieving and formatting
- send response / error

## Service

Contain the business logic for a given domain and link the business logic into
the data retrieving from different repositories.

It define what can we do with our domain

## Repositories

Contain the different way to retrieve our data for this domains, from a real
implementation like mongoose, sql, prisma to InMemory or Json for testing
purpose, it provde an easier migration of database provider and testing purpose.

## Models

Contain the interface/enum/constants and factory to build our data for this
domain. It should be totally abstract of any Database schema/template.

## Dto

Contain the interface of communication between the different layers
(controllers, services, repositories)

# Opinion

I was at first going to setup something more abstract and related to hexagonal
archicture before looking to the nest domentation and seeing that they seems
have a nice basic structure which could be faster especially for a test like
this.

So I try to find the right balance between DDD/Hexa and Nest basic structure and
the given time, it's was not simple and it turn out not really good I think.

If I had more time and real life project I would change the top level
architecture "domains" to find a better way to split the different subject
(user, company, notificaton, channels) and abstract everything around nest to be
able to switch into another lib easily.

I will keep the low level architecture especially the repositories style.
