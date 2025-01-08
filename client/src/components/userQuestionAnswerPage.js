import React from "react";
import { useState } from "react";
import DisplayAnswersQuestion from "./displayUserAnswersQuestion";
import DisplayComments from "./displayComments";
import { getDateFormat } from "./dateFormatting";

function displayTags(question, tags){
  var result = [];
  for(var i = 0; i < question.tags.length; i++){
     for(var j = 0; j < tags.length; j++){
      var tid = tags[j]._id;
      if (question.tags[i]._id === tid){
        result.push(tags[j].name);
      }
     }
  }
  return result;
}

export default function UserAnswersPage(props){
    var numOfviews = props.question.views
    var numOfAnswers = props.question.answers.length

    // console.log(props.question.text)
    
    function showHTMLInText(stringWithHtml) {
        return { __html: stringWithHtml };
    }

    //console.log(showHTMLInText(props.question.text))

    var totalUpvotes = props.question.upvotes.length
    var totalDownvotes = props.question.downvotes.length
    var votesScore = totalUpvotes - totalDownvotes

    const [commentText,setCommentText] = useState(null);
    function getCommentText(val){
        setCommentText(val.target.value)
    }

    const clearTextBoxAndPostComment = () => {
      console.log("Comment text before posting:", commentText);
      props.createAndAddCommentFunc(commentText, props.question);
      setCommentText('');
      console.log("Comment text after posting:", commentText);
    };

    return(
        <>
          <h2>                                                           
          <table id= "mainContent">
            <tr>
              <td className ="leftSideBar">
              </td>
              <td rowSpan="2" id="allQuestionsCell">
                <div id= "numOfAnswersDiv">{numOfAnswers} Answers</div>
                <div id= "viewsDiv">{numOfviews} Views</div>
              </td>
              <td rowSpan="2" id="askQuestionButtonCell" className ="hideWhenAskingButtons">
              {localStorage.getItem("isGuest") === "false" && (
                <button id="askQuestionsButton" onClick={props.openAskQuestionPageFunc}>
                  Ask Question
                </button>
              )}
              </td>
            </tr>
            <tr>
              <td id= "questionsLinkCell" className="leftSideBar">
                <a href="#" id="questionsLink" onClick={props.openMainPageFunc}>Questions</a>
              </td>
            </tr>
            <tr>
              <td className ="leftSideBar">
              </td>
              <td  id= "numOfQuestionsCell">
                <div id= "questionTitleDiv">{props.question.title}</div>
              </td>
                {/* <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                </td> */}
            </tr>
            <tr>
              <td id= "tagsCell" className="leftSideBar">
                <a href="#" id="tagsLink" onClick={props.openTagsPageFunc}>Tags</a>
              </td>
              <td id="horLineHeaderPart1AnswerPage" className="hideWhenAskingLine">
              </td>
              <td id="horLineHeaderPart2AnswerPage" className="hideWhenAskingLine">
              </td>
            </tr>
            <tr>
            <td className= "leftSideBarLastCell">
                <div id="userProfileLinkDiv">
                  {localStorage.getItem("isGuest") === "false" && (
                  <a href="#" id="userProfileLink" style={{backgroundColor: "lightgray"}}  onClick={props.openUserPageFunc} >User</a>
                  )}
                </div>
              </td>
              <td id="mainBody" colSpan="2">

                <div id= "questionVotingBox">
                  {props.isGuest == false && (
                    <button id= "upvote" onClick={() => props.upvoteQuestionFunc(props.question)}>Upvote <br></br>{props.question.upvotes.length}</button>
                  )}
                    <div id= "totalVotesDiv">{votesScore}</div>
                  {props.isGuest == false && (
                    <button id= "downvote" onClick={() => props.downvoteQuestionFunc(props.question)}>Downvote {props.question.downvotes.length}</button>
                  )}
                </div> 

                <div id="questionTextDiv" dangerouslySetInnerHTML = {showHTMLInText(props.question.text)}></div>
                <div id="userNameandDateDiv">
                    <div id="userNameDiv"><span className="redText">{props.question.asked_by}</span></div>
                    <div id="dateDiv">asked {getDateFormat(new Date(props.question.ask_date_time))}</div>
                </div>
                <div id="bigTagDivAnswers">
                        {displayTags(props.question, props.tags).map((tag, index) => (
                            <div className ="smallTagDiv" key = {index}>{tag} </div>
                        ))} 
                </div>

                <div id="questionCommentsBigDiv">
                  <DisplayComments
                    question = {props.question}
                    comments = {props.comments}
                    isGuest = {props.isGuest}
                    upvoteCommentFunc = {props.upvoteCommentFunc}
                    commentPagePageNumber = {props.commentPagePageNumber}
                  />

                </div>

                {/* <div id="questionCommentPostForm">
                  <input type ="text" value = {commentText || ""} placeholder="Add comment here (140 chars. max). . ." id="commentTextBox" onChange={getCommentText}></input>
                  {props.commentTooLongError && (
                  <div id="commentTooLongErrorBox">Error: Comment text cannot exceed 140 characters</div>
                  )}
                  {props.commentEmptyError && (
                  <div id="commentEmptyErrorBox">Error: Comment text cannot be empty</div>
                  )}
                  <br></br>
                    <button id="postCommentButton" onClick={() => clearTextBoxAndPostComment(commentText, props.question)}>Post Comment</button>
                </div> */}
                
                <div id='pageButtonsComments'>
                  {props.commentPagePageNumber != 1 && (
                  <button id="prevPageButtonComments" onClick={props.decrementCommentsPageFunc}>Prev</button>
                  )}
                  <>{props.commentPagePageNumber}</>
                  {props.comments.length > 3 && (
                  <button id="nextPageButtonComments" onClick={() => props.incrementCommentsPageFunc(props.question.comments.length)}>Next</button>
                  )}
                </div>

                <DisplayAnswersQuestion
                    question = {props.question}
                    comments = {props.comments}
                    answers = {props.answers}
                    answersPagePageNumber = {props.answersPagePageNumber}
                    isGuest = {props.isGuest}
                    upvoteAnswerFunc = {props.upvoteAnswerFunc}
                    downvoteAnswerFunc = {props.downvoteAnswerFunc}

                    commentPagePageNumber = {props.commentPagePageNumber}
                    incrementCommentsPageFunc = {props.incrementCommentsPageFunc}
                    decrementCommentsPageFunc = {props.decrementCommentsPageFunc}
                    upvoteCommentFunc = {props.upvoteCommentFunc}
                    commentTooLongError = {props.commentTooLongError}
                    commentEmptyError = {props.commentEmptyError}

                    createAndAddCommentAnswerFunc = {props.createAndAddCommentAnswerFunc}
                    openUserQuestionAnswerPageFunc = {props.openUserQuestionAnswerPageFunc}
                    answersCall = {props.answersCall}
                    openAnsweringPageNewFunc = {props.openAnsweringPageNewFunc}
                />

                <div id='pageButtonsAnswers'>
                  {props.answersPagePageNumber != 1 && (
                  <button id="prevPageButton" onClick={props.decrementAnswersPageFunc}>Prev</button>
                  )}
                  {props.answersPagePageNumber}
                  {numOfAnswers > 5 && (
                  <button id="nextPageButton" onClick={() => props.incrementAnswersPageFunc(numOfAnswers)}>Next</button>
                  )}
                </div>

                <div id="answerQuestionButtonDiv">
                {localStorage.getItem("isGuest") == "false" && (<button id="answerQuestionButton" onClick={props.openAnsweringPageFunc}>
                        Answer Question
                    </button>)}
                </div>
              </td>
            </tr>
          </table>
        </h2>
          </>
    );
}