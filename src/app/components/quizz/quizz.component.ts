import { Component, OnInit } from '@angular/core';
import quizzQuestions from  '../../../assets/data/quiz_questions.json';


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = '';

  questions:any;
  questionSltd:any;
  
  answerSltd:string = '';
  answers:string[] = [];

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(quizzQuestions){
      this.finished = false;

      this.title = quizzQuestions.title;
      
      this.questions = quizzQuestions.questions;
      this.questionSltd = quizzQuestions.questions[this.questionIndex];
      
      this.questionMaxIndex = quizzQuestions.questions.length;
      this.questionIndex = 0;


    }
  } 

  answerChoose(alias:string){
    this.answers.push(alias);
    this.questionIndex++;

    if(this.questionMaxIndex == this.questionIndex){
      this.finished = true;
      this.checkResult(this.answers).then(reponse => this.answerSltd = quizzQuestions.results[reponse as keyof typeof quizzQuestions.results]);
    }else{
      this.questionSltd = quizzQuestions.questions[this.questionIndex];
    }
    
  }

  async checkResult(answers:string[]){
    const result:string = answers.reduce((previous, current, i, arr) =>{
      if(
        arr.filter(item => item === previous) > arr.filter(item => item === current)
      ){
        return previous;
      }else{
        return current;
      }
    })
    console.log(result);
    return result;
  }

} 
