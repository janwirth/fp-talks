# FP Talk Lisbon, Wed. 14.Jan 2020

## Intro
- History of FP
- 90 years ago, the lambda calculus was developed to solve fundamental mathematical Alonzo Church 1930
- It is called the 'assembly language'. Provides basic terms of abstraction
- it is turing-complete
- Over the recent, , functional programming has gained traction in the FP community
- 2009 (ES5) 
- 2015 (ES6) JS got upgrades like arrow functions, promises
## What we will learn today
- treatment as a toolbox to use in everyday life
- usage in JS, but the way of thinking and the principles can carry over to other languages
- Not a silver bullet
- Not a better tool - but the better tool for some jobs
- Some things in common, some things are different
- If you know excel, you already have a foot in the door.
- If you are a JS developer, you are most likely using a lot of these things already
- Looking to give you some ideas / tools to think about 
- Huge field, it is a taste of what is possible

## Basics
### Immutable Data & Pure functions
- Immutable data
- The problem of shared state
- Functions vs routine example
- const & non-destructive updates

### Higher-Order Functions
Dependency injection anyone?

### Modelling State
Event streams from DOM

## Containers for Modelling Data - Functors and Monads
Algebraic data types: Composite type
Monad and functors are Interfaces - they define the methods that are possible
A composite type we all know is a list
A functor is something we can 'map' over

Might seem initimidating
- hard-core category theory
A functor is a mapping between categories

more mappables
- streams
- maybes

## Building UI in a strict functional style
Pushing side-effects to the boundaries of our application
