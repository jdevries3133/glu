# Plan for Protecting Children's Data

COPPA Compliance and respect for childrens' online data is a first-class
concern of this platform. This is a detailed technical design document for
exactly how we will maintain safety and security for student data that enters
the platform. It will evolve as the platform evolves, maintaining a security
plan for every feature that we build.

## Disclaimer

I am not a lawyer and I have not (at this time) consulted with one. I am a
software engineer and former teacher who is reading the fules

## Contributing

This is a free and open source project. If you see an issue, say something!
[Click here to open a new issue on this
project if you see anything that is confusing, wrong, misspelled, etc.](https://github.com/jdevries3133/glu/issues/new)

I am not perfect, but I take this part of the project very seriously.

## Definitions

Unless otherwise specified, we inherit the definitions from COPPA.

| Term                                      | COPPA Definition (and ours)                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| child / children                          | folks under 13 years of age                                                       |
| Personally Identifiable Information (PII) | it's complicated, but we use COPPA's complicated and well-thought-out definitions |

## Meta: Document Format

Each top-level section (like "Quick Games") has at least two subsections:
"overview," and "technical details."

Overview sections always strive to be readable by any Glue user.

Technical detail sections might be a bit confusing if you are not a technical
person.

The idea is that this document satisfies the following use cases:

- A user can read the overview sections and understand what the app does
- A lawyer can read the law and the overview and validate that the overview's
  promises satisfies the law
- A software engineer can read the overview and the technical details and
  validate that the technical details satisfy all of the promises in the
  overview
- An engineer or other technical auditor can review the technical details and
  the source code itself, and validate that the source code satisfies the
  technical details

# Quick Games

## Overview

"Quick games," are all the games listed [on our website
here](https://glu.education/g/games). The purpose of these is to bootstrap the
Glu project by building relationships with teachers and providing the
opportunity to wrestle with some of the data integration problems that Glu
later seeks to solve. To that end, we want to have very low adoption friction.
At this time, teachers can use any of these games without getting COPPA
approval from administrators or parents, because we do not collect any Childs'
Personal Identifiable Information (PII) whatsoever. When that changes (it
probably will in the next few months), we will send an email to everyone who
has signed up for our general mailing list via [our
homepage](https://glu.education/)

All "quick games," will be free and open to the web. For the time being, quick
games _will not_ require user authentication, to maintain low friction of
adoption. This presents a concern: how can we keep personalized student data
safe without authentication? Answer: **any and all interactions with
unauthenticated quick games will not collect, store, or so much as touch with a
ten foot pole any personally identifiable information (PII) data.**

## Technical Details

We will use COPPA's definition of personally identifiable information here:

> Personal information means individually identifiable information about an
> individual collected online, including:
>
> 1. A first and last name;
> 2. A home or other physical address including street name and name of a city
>    or town;
> 3. Online contact information as defined in this section;
> 4. A screen or user name where it functions in the same manner as online
>    contact information, as defined in this section;
> 5. A telephone number;
> 6. A Social Security number;
> 7. A persistent identifier that can be used to recognize a user over time and
>    across different Web sites or online services. Such persistent identifier
>    includes, but is not limited to, a customer number held in a cookie, an
>    Internet Protocol (IP) address, a processor or device serial number, or
>    unique device identifier;
> 8. A photograph, video, or audio file where such file contains a child's
>    image or voice;
> 9. Geolocation information sufficient to identify street name and name of a
>    city or town; or
> 10. Information concerning the child or the parents of that child that the
>     operator collects online from the child and combines with an identifier
>     described in this definition.

You might notice this bit of our data model -- we are storing `id` and
`name` for every "game player":

```
model GamePlayer {
  id                 String               @id @default(cuid())
  name               String?
  GptGuessGameGuess  GptGuessGameGuess[]
  GptGuessGameResult GptGuessGameResult[]
}
```

`name` will be generated by the application to some silly string, like "Giant
Wobbly Fish." Maybe we will add support for user-provided names being stored in
this field in the future, but making it impossible for the user to enter a name
and just using silly server-generated fake names is both fun and pragmatic to
keep PII out of our system.

Still, it feels like having an `id` at all violates COPPA definition #7 of PII:

> A persistent identifier that can be used to recognize a user over time and
> across different Web sites or online services. Such persistent identifier
> includes, but is not limited to, a customer number held in a cookie, an
> Internet Protocol (IP) address, a processor or device serial number, or
> unique device identifier;

Indeed, I was going to remove this from the application design, but an [ftc.gov
FAQ assuaged my
concerns:](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)

> Therefore, you will need to disclose in your privacy policy (see FAQ C.2),
> and in your direct notice to parents (see FAQ C.9), your collection, use or
> disclosure of such persistent identifiers unless (1) you collect no other
> “personal information,” and (2) such persistent identifiers are collected on
> or through your site or service solely for the purpose of providing “support
> for the internal operations” of your site or service.

Since we only collect game data and a random id for children, we meet the
criteria of exception #1 above. It is crucial that we maintain this constraint,
and never collect PII through the quick games mechanism.

## Why Are You Trying So Hard To Have IDs?

The following features would be impossible to my understanding without giving
players a unique id:

- Providing players with a history of the games they have played and their
  outcomes
- Later linking a player profile to a student account once we have a more
  mature authentication framework
- Allowing children to participate in leaderboards
- Allowing people to replace `name` with a real name in the future and having
  it propagate throughout the system correctly
- Allowing teachers to take ownership over a batch of student gameplay data,
  which they are then authorized to assign name mappings to
  - note: this feature is not implemented
  - note: if implemented, this step will involve storing childrens' PII
  - note: how this feature meshes with COPPA is unknown at this time - we'll
    cross that bridge if/when we come to it
