module Slides exposing (Message, Model, slides, subscriptions, update, view)

import Browser.Events exposing (onAnimationFrameDelta)
import Html exposing (Html, a, div, h1, img, li, p, small, text, ul)
import Html.Attributes exposing (href, src, style)
import Markdown
import SliceShow.Content exposing (..)
import SliceShow.Slide exposing (..)


{-| Model type of the custom content
-}
type alias Model =
    Float


{-| Message type for the custom content
-}
type alias Message =
    Float


{-| Type for custom content
-}
type alias CustomContent =
    Content Model Message


{-| Type for custom slide
-}
type alias CustomSlide =
    Slide Model Message


{-| Update function for the custom content
-}
update : Message -> Model -> ( Model, Cmd Message )
update elapsed time =
    ( time + elapsed, Cmd.none )


{-| View function for the custom content that shows elapsed time for the slide
-}
view : Model -> Html Message
view time =
    small
        [ style "position" "fixed", style "bottom" "0", style "right" "0" ]
        [ text
            ("the slide is visible for "
                ++ (round time // 1000 |> String.fromInt)
                ++ " seconds"
            )
        ]


{-| Inputs for the custom content
-}
subscriptions : Model -> Sub Message
subscriptions _ =
    onAnimationFrameDelta identity


{-| The list of slides
-}
slides : List CustomSlide
slides =
    [ regularPerson
    , intro
    , usuallyEnemyOfTheState
    , usuallyJason
    , todayPacifist
    , agenda
    , pureFunctions
    , immutability
    , higherOrderFunctions
    , composition
    , compositionExplained
    , pointFreeStyle
    , monadsAndFunctors
    -- , furtherReading
    ]
        |> List.map paddedSlide


bullets : List CustomContent -> CustomContent
bullets =
    container (ul [])


bullet : String -> CustomContent
bullet str =
    item (li [] [ text str ])


bulletLink : String -> String -> CustomContent
bulletLink str url =
    item (li [] [ a [ href url ] [ text str ] ])


{-| Syntax higlighted code block, needs highlight.js in index.html
-}
code : String -> String -> CustomContent
code lang str =
    item (Markdown.toHtml [] ("```" ++ lang ++ "\n" ++ str ++ "\n```"))


{-| Custom slide that sets the padding and appends the custom content
-}
paddedSlide : List CustomContent -> CustomSlide
paddedSlide content =
    slide
        [ container
            (div [])
            (content ++ [ custom 0 ])
        ]

pssstKidsMeme = "https://i.imgflip.com/3gznxz.jpg"
immutabilityMeme = "https://i.redd.it/krvmipkb4re11.jpg"
higherOrderFunctionMeme = "https://i.imgflip.com/3h3wyv.jpg"
askForBothMeme = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjHXpKESnsTSnKeLWBJ_E1r12Yxj18ywTbubYAwDuSD9BZbSxW"
iShouldLearnMeme = "https://framasphere.org/uploads/images/thumb_large_be5b8183dd85ba822c84.jpg"
gurlUAMonadMeme = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.quora.com%2FWhat-are-some-good-jokes-about-Haskell&psig=AOvVaw1fPk8GwM3Ga6hqTUC5_7EF&ust=1574361030506000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND7nK-2-eUCFQAAAAAdAAAAABAh"
vennDiagramImage = "https://res.infoq.com/presentations/elm-functional-reactive-programming/en/slides/sl11.jpg"
javascriptEverywhereMeme = "https://miro.medium.com/max/600/1*d5-0BS2qFeuGe0Z9DIObEQ.jpeg"
liveCodingMistakeMeme = "https://image.slidesharecdn.com/everydayfunctionalprogramminginjavascript-170802030751/95/everyday-functional-programming-in-javascript-15-638.jpg?cb=1501643324"
makeLetNotWarMeme = "https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/12/1450460008joys-of-block-scoping-with-es602-make-let-not-var.jpg"
avoidStatesMeme = "https://pbs.twimg.com/media/Crz7oUMWEAEoq3Y.jpg"
nightmareOnElmStreet = "nightmareOnElmStreet.jpg"
pureFunctionRealizationMeme= "https://cdn.memegenerator.es/imagenes/memes/full/21/87/21879118.jpg"
aintNobodyGotTimeForThat = "https://i.imgflip.com/3gzuxk.jpg"
pointFreeMeme = "http://screeneggs.com/wp-content/uploads/2019/04/305w3a63ruq21.jpg"
compositionDiagram = "http://www.ouarzy.com/wp-content/uploads/2017/08/Untitled-2.png"
compositionMeme = "https://assets.classicfm.com/2018/08/too-hot-to-handel-meme-1519989559.jpg"
monadIllustration = "http://adit.io/imgs/functors/monad_nothing.png"
curryMeme = "https://pics.me.me/curry-haskell-developers-indian-chefs-functional-programming-63423721.png"
tasksMeme = "https://i.imgflip.com/14xsvu.jpg"

intro =
    [ item (h1 [] [text "Welcome"])
    , item (img [ src pssstKidsMeme] [])
    ]
regularPerson =
    [ item (h1 [] [text "The other day"])
    , item (img [ src iShouldLearnMeme] [])
    ]
usuallyEnemyOfTheState =
    [ item (h1 [] [text "Me, today, in my spare time"])
    , item (img [ src avoidStatesMeme] [])
    ]
usuallyJason =
    [ item (h1 [] [text "Me, 1980, colorized"])
    , item (img [ src nightmareOnElmStreet] [])
    ]
todayPacifist =
    [ item (h1 [] [text "Just for you"])
    , item (img [ src makeLetNotWarMeme] [])
    ]


pureFunctions = 
    [ item (h1 [] [ text "Pure Functions" ])
      , item (img [ src aintNobodyGotTimeForThat] [])
  ]

immutability =
    [ item (h1 [] [ text "Immutability" ])
      , item (img [ src immutabilityMeme] [])
  ]

higherOrderFunctions =
    [ item (h1 [] [ text "Higher-Order Functions" ])
      , item (img [ src higherOrderFunctionMeme] [])
  ]
composition =
    [ item (h1 [] [ text "Composition" ])
      , item (img [ src compositionMeme] [])
  ]

compositionExplained =
    [ item (h1 [] [ text "Composition for scaling" ])
      , item (img [ src compositionDiagram] [])
  ]

pointFree =
    [ item (h1 [] [ text "Point-Free Style" ])
      , item (img [ src pointFreeMeme] [])
  ]

hotReload =
    [ item (h1 [] [ text "Hot Reload" ])
      , item (img [ src pureFunctionRealizationMeme] [])
  ]

jsx =
    [ item (h1 [] [ text "Further Reading" ])
      , item (img [ src pureFunctionRealizationMeme] [])
  ]


agenda =
    [ item (h1 [] [ text "What are we doing?" ])
      , bullets
            [ bullet "Taking off the edge." |> hide
            , bullet "Not accurate, but a useful way of thinking" |> hide
            , bullet "See me fail." |> hide
            , item (h1 [] [ text "Known Territory" ]) |> hide
            , bullet "Pure Functions" |> hide
            , bullet "Immutable Data" |> hide
            , item (h1 [] [ text "Unknown Territory" ]) |> hide
            , bullet "Functors" |> hide
            , bullet "Monads" |> hide
            , bullet "Higher-Order Functions" |> hide
            , bullet "Composition" |> hide
            ]
      ]

pointFreeStyle =
    [ item (h1 [] [text "Point-Free Style"])
    , item (img [ src pointFreeMeme] [])
    ]

furtherReading =
    [ item (h1 [] [ text "What are we doing?" ])
      , bullets
            [ bullet "https://github.com/lodash/lodash/wiki/FP-Guide"
            , bullet "https://mostly-adequate.gitbooks.io/"
            , bullet "https://www.youtube.com/watch?v=JZSoPZUoR58&t=812s"
            , bullet "tomasp.net/academic/papers/monads/monads-programming.pdf"
            , bullet "http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html"
            , bullet "https://github.com/jorgebucaran/hyperapp"
            ]
      ]
