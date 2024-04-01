# Sprint 1 Planning Meeting

### Topics to discuss:
* Features to be done for sprint 1
* Task distribution
* Technologies to use
* Process for contributing to code base


### Participants

patel415, nguy1924, zhengj69, songwil3, siudonni, hongse10


### Features to be done for sprint 1

See JIRA for task breakdowns

* BES-1 Login and signup
* BES-2 List view of communities
* BES-3 Joining communities
* BES-8 Create private chats
* BES-7 Create admin panel to edit communities


### Task distribution

BES-1 Login and signup

* Identity server and authentication - Smit
* Authorization server - Jun
* Front-end - Jun

BES-2 List view of communities

* Back-end - Hoang / Will
* Front-end - Will

BES-3 Joining communities with levels

* Back-end - Chris
* Front-end - Chris

BES-8 Private chats

* Back-end - Don
* Front-end - Don

BES-7 Add/Remove Communities

* Hoang / Will

### Technologies to use

Front-end Technology: React, TypeScript

Profile service (& add/remove communities)
* Spring Boot
* REST
* Neo4j / MongoDB

Chat management service
* Spring Boot
* REST
* MongoDB (NoSQL)

Identity Service
* Firebase

Authorization Service
* Node.js / Express / TS
* REST
* MongoDB

Global
* Docker (if you are using Windows, only professional version is supported)
* Kubernetes (expect it for sprint 3-4)
* Nginx

### Process for contributing to code base
* You must create a branch before pushing any code.
    * Any push directly to master will be removed.
* For all PRs you must have at least 1 reviewer
    * Choose a good reviewer for your PR (code owners)
* Remove the branch once you have merged
* Always use Squash and Merge
* Make sure PRs are small
* When reviewing PRs, make sure pull to local first.
* You should never reject a PR, unless you can prove there is a bug
    * If there’s a stylistic change that needs to be made, accept the PR and tell the person to change it. (Honor system boios)
* Make sure you try to review the PR within 24hrs.
* Maintain a ReadMe.md per folder
* Don’t merge other people’s PR.
    * If you open a PR, you are responsible for merging it.
* Testing
    * Just do reasonable testing.
    * If you have something like: return true <- don’t test that
* Licensing
    * we aren’t going to license any of our code.
