Pet project to show use case usages (and advantages)

# Some notes

- repository
    - implementation is for the test purpose. They are using in memory only for now;
    - intended to make all methods async
- uses cases
    - shall not know about the caller. So, no SQS / express / etc references here;
    - in some cases they are using more dependencies that are needed, just to prove a point
- it intentionally doesn't have tests, as it is just a POC / showcase
- pending
    - error handling