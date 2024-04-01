# cscc01 -- final presentation

- team name: Best Team
- for questions or concerns about your mark, email mstr.zhang@mail.utoronto.ca within **3 days** of receiving your mark

**total mark**: 35/35

---

## live presentation

**total mark**: 10/10

|category|mark|total|
|---|---|---|
|introduction|1|1|
|feature #1|3|3|
|feature #2|3|3|
|feature #3|3|3|

**additional comments**:

- introduction                                                                  (1/1)
    - was fine
- profile page                                                                  (3/3)
    - logging in / creating an account
    - can edit profile information
    - images are actual images and not URLs
        - good work
- viewing fandoms                                                               (3/3)
    - user interface is really good
        - a lot of care and attention to detail in the design of the user interface
        - probably the cleanest web-based user interface
    - communities and sub-communities
        - sub-communities was a very good and unique idea
        - can choose proficiency level in each community
    - can edit events after they've been made
    - can make posts on events
- chat                                                                          (3/3)
    - chat functionality is probably the least fleshed out feature you have
        - user interface is not great
            - pops out alerts
            - does not appear to be in real-time
            - having to create a chat room feels a little awkward
                - maybe add additional functionality to communicate with specific users
                - maybe provide functionality to delete chat rooms (possibly for higher privileged users)

---

## process

**total mark**: 10/10

|category|mark|total|
|---|---|---|
|members presented professionally, dressed appropriately, all members present|4|4|
|team communication, processes, standards, and techniques|6|6|

**additional comments**:

- members are professional:                                                     (4/4)
    - most team members are dressed business casual
        - some team members are dressed a little too casually but didn't deduct any marks
- team communication                                                            (2/2)
    - good overview of the communication
    - details of the communication was explained well
- processes + standards                                                         (2/2)
    - generally explained pretty well
    - good standards
        - code review standards
        - standards to how to participate in discussions
        - syntax styles
            - note: prettier.io is not a syntax style; it just formats code and makes it "prettier" but does nothing for linting
- techniques                                                                    (2/2)
    - interesting use of the microservice architecture
    - really cool strategy of seeing the logs for each microservice

---

## software architecture

**total mark**: 10/10

|category|mark|total|
|---|---|---|
|architecture presented clearly, illustrated with sufficient diagrams, responsibilities shown clearly|4|4|
|technologies presented clearly, illustrated with sufficient diagrams/links/examples, technical challenges indicated clearly||6|

**additional comments**:

- architecture                                                                  (4/4)
    - good diagram
    - good explanation of why you chose the design pattern that you did
        - should have went over some of the downsides of the microservice strategy
            - e.g. reductions in performance (increased overhead when loading components); users need to be more knowledgeable
            - i also think it is unfair to say that there are no blockers when using the microservice strategy
                - you will still encounter situations where you rely on the functionality of other people's components before you can continue
- technologies                                                                  (6/6)
    - good overview of the services and technologies that you've used
        - liked the way you organized this; the specific technologies related to each service (as a result of using the microservice architecture)
        - some of your points are a little verbose; could have been a little more concise
            - a little too detailed for some slides
    - would have liked an explanation of why you chose to use the technologies you did
        - you used a lot of technologies for each component
            - was there any advantage to using "X" technology for "X" component?
            - was there any reason why you chose to use the technologies that you did?
    - technical challenges
        - mostly issues resulting from the nature of the microservice architecture
        - knowing different language is not a technical challenge
            - this is a feature of the microservice architecture strategy; this is a pretty insignificant example of a challenge you faced
        - solution -- abstraction layer:
            - good solution; explained well

---

## participation

**total mark**: 5/5

|category|mark|total|
|---|---|---|
|q1|2|2|
|q2|2|2|
|questions asked in professional tone|1|1|

**additional comments**:

- questions
    - how do you keep the data consistent after you remove accounts?
    - why did you choose to store URLs as opposed to images?
