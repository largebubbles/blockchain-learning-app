---
day: 5
title: "The Double-Spending Problem"
module: "Understanding Money"
duration: "5 min read"
---

# The Double-Spending Problem

## Learning Objective
Understand the core challenge that Bitcoin solves

## What is Double-Spending?

**Double-spending** means spending the same money twice (or more).

With physical cash, this is impossible:
- You hand someone a $20 bill
- You no longer have that $20 bill
- Only one person can have it at a time

But with digital money, it's different...

## The Digital Copy Problem

Digital files can be copied infinitely:
- Copy a photo → Original stays, copy exists
- Copy a document → Both versions are identical
- Copy a song → Infinite copies possible

This is great for information, terrible for money!

**Example of the problem:**
1. You have a digital file that represents "$100"
2. You send it to Alice
3. But you can also copy it and send it to Bob
4. And Charlie, and David, and...
5. Everyone thinks they have your $100!

## Why Can't We Just Copy-Paste Money?

Imagine if you could:
- Screenshot your bank balance
- Paste it to make your balance bigger
- Send the same $10 to 100 different people
- Copy money files like you copy photos

The money system would collapse! Money only works if it's scarce (limited).

## How Traditional Systems Prevent This

### Solution 1: Physical Cash
Can't copy physical objects (easily)

### Solution 2: Central Database (Banks)
- Bank keeps ONE official record
- Bank checks: "Does this person have $10?"
- If yes: Update record (subtract $10, add to recipient)
- If no: Transaction rejected
- The bank is the single source of truth

This works! But requires trusting the bank.

## The Challenge for Digital Cash

To create money that works like cash (peer-to-peer) but digital, we need:

✅ Digital (can be sent over the internet)
✅ Instant (no waiting days)
✅ No middleman (no bank required)
✅ Can't be double-spent (each coin exists only once)
✅ Verifiable (everyone can check it's legitimate)

This seemed impossible without a central authority...

## The Breakthrough

In 2009, someone (or a group) using the name "Satoshi Nakamoto" published a solution:

**What if everyone kept a copy of the ledger?**

Instead of one bank with one record:
- Thousands of computers each have a copy
- All copies are kept in sync
- Everyone can verify transactions
- No single entity controls it
- Consensus (majority agreement) prevents cheating

This is called **blockchain technology**, and Bitcoin was the first successful implementation.

## Key Takeaways

- Digital files can be copied infinitely—bad for money
- Double-spending is the core problem of digital cash
- Banks solve this with central record-keeping
- Bitcoin solved it with a distributed ledger
- Thousands of computers working together can replace one trusted bank

## Think About It

If thousands of computers all have copies of the same record book, how do they agree on what's true? How do you prevent someone from changing their copy? We'll explore this next!

---

**Tomorrow we'll learn about:** What is a ledger?
