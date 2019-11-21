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
    [ intro
    , regularPerson
    , usuallyEnemyOfTheState
    , usuallyJason
    , todayPacifist
    , agenda
    , pureFunctions
    , [ item (h1 [] [ text "Running the engine" ])
      , code "elm" """main : Program Never
main =
  SliceShow.init slides
  |> SliceShow.show"""
      ]
    , [ item (h1 [] [ text "Structuring the content" ])
      , code "elm" """bullet : String -> Content {} {}
bullet str = item (li [] [text str])
bullets : List (Content {} {}) -> Content {} {}
bullets = container (ul [])
bulletsSlide : Slide {} {}
bulletsSlide =
  slide [bullets [bullet "first", bullet "second"]]"""
      ]
    , [ item (h1 [] [ text "Syntax highlight" ])
      , code "elm" """code : String -> String -> Content {} {}
code lang str =
  Markdown.toHtml
    []
    ("```" ++ lang ++ "\\n" ++ str ++ "\\n```")
  |> item
codeSlide : Slide {} {}
codeSlide =
  slide
    [ code "elm" \"\"\"bullet : String -> Content {} {}
  bullet str = item (li [] [text str])\"\"\"
    ]
      """
      ]
    , [ item (h1 [] [ text "Custom slides" ])
      , code "elm" """elapsed : Content Time Time
elapsed = custom 0
slide : Slide Time Time
slide = slide [item (text "Elapsed: "), elapsed]
main : Program Never
main = init [slide]
  |> setSubscriptions (\\_ -> AnimationFrame.diffs identity)
  |> setUpdate (\\dt time -> (time + dt, Cmd.none))
  |> setView (\\time -> text (toString time))
  |> show"""
      ]
    , [ item (h1 [] [ text "Questions?" ])
      , item (p [] [ text "elm package install w0rm/elm-slice-show" ])
      ]
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
higherOrderFunctionMeme = "https://i.pinimg.com/736x/1e/4d/ea/1e4dea25c0bad79bb2224b57d316682f.jpg"
askForBothMeme = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjHXpKESnsTSnKeLWBJ_E1r12Yxj18ywTbubYAwDuSD9BZbSxW"
gurlUAMonadMeme = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.quora.com%2FWhat-are-some-good-jokes-about-Haskell&psig=AOvVaw1fPk8GwM3Ga6hqTUC5_7EF&ust=1574361030506000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND7nK-2-eUCFQAAAAAdAAAAABAh"
vennDiagramImage = "https://res.infoq.com/presentations/elm-functional-reactive-programming/en/slides/sl11.jpg"
javascriptEverywhereMeme = "https://miro.medium.com/max/600/1*d5-0BS2qFeuGe0Z9DIObEQ.jpeg"
liveCodingMistakeMeme = "https://image.slidesharecdn.com/everydayfunctionalprogramminginjavascript-170802030751/95/everyday-functional-programming-in-javascript-15-638.jpg?cb=1501643324"
makeLetNotWarMeme = "https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/12/1450460008joys-of-block-scoping-with-es602-make-let-not-var.jpg"
avoidStatesMeme = "https://lh3.googleusercontent.com/proxy/UaPQ0q6pjhPHETOx0VNMNzgX7-KRpTyTKvDVh20omODvJYM-SSKdvYOEdXMxiERhWyJGh1ZSm9k_haMQXbRO7kODrvjYvyM8aDllBv7EBP3W3w9GUYANDLZKe4ND330RZnhOOGDt55vZH6-W4RrfuxzvMPLAd7aSxps"
nightmareOnElmStreet = "nightmareOnElmStreet.jpg"
pureFunctionRealizationMeme= "https://cdn.memegenerator.es/imagenes/memes/full/21/87/21879118.jpg"
aintNobodyGotTimeForThat = "https://i.imgflip.com/3gzuxk.jpg"

intro = [item (img [ src pssstKidsMeme] []) ]
regularPerson = [item (img [ src askForBothMeme] []) ]
usuallyEnemyOfTheState = [item (img [ src avoidStatesMeme] []) ]
usuallyJason = [item (img [ src nightmareOnElmStreet] []) ]
todayPacifist = [item (img [ src makeLetNotWarMeme] []) ]

hotReload = [item (img [ src makeLetNotWarMeme] []) ]
pureFunctions = 
    [ item (h1 [] [ text "Pure Functions" ])
      , item (img [ src aintNobodyGotTimeForThat] [])
  ]

agenda =
    [ item (h1 [] [ text "What are we doing?" ])
      , bullets
            [ bullet "Taking off the edge." |> hide
            , bullet "Known territory:" |> hide
            , bullet " TODO - fill according to poll " |> hide
            , bullet "Unknown teritory" |> hide
            ]
      ]
