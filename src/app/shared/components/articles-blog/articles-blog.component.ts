import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-blog',
  templateUrl: './articles-blog.component.html',
  styleUrls: ['./articles-blog.component.css']
})
export class ArticlesBlogComponent implements OnInit {

  constructor() { }
 
  articles =[
    {
      img:"assets/img/blog/01.jpg",
      createdAt:"05 May, 2021",
      title:"Comment organiser une cousinade",
      url:"",
      description:"le principe est simple, il sagit de se rassembler entre cousins germains et de s'organiser une belle fête ."
    },
    {
      img:"assets/img/blog/03.jpg",
      createdAt:"05 May, 2021",
      title:"Comment organiser un voyage à plusieurs",
      url:"",
      description:"Parce que les voyages en groupe doivent être de bons moments, voilà 10 conseils pour être sûr de profiter au maximum de votre voyage entre amis"
    },
    {
      img:"assets/img/blog/02.jpg",
      createdAt:"05 May, 2021",
      title:"Comment gérer une relation à distance",
      url:"",
      description:"Qu'on se rassure, vivre une relation longue distance épanouie c'est possible"
    }
  ]

  ngOnInit(): void {
  }

}
