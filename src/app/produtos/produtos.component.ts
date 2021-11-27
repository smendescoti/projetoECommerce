import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';
import { CarrinhoComprasService } from '../services/carrinho-compras.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = []; //exibir a listagem de produtos
  page = 1; //armazenar o indice da paginação
  filtro : string = ""; //capturar o filtro de busca

  //atributo para armazenar os dados do produto selecionado
  itemProduto: Produto = {
    idProduto: 0, nome: '', preco: 0, quantidade: 0, descricao: '', foto: ''
  };

  constructor(
    private produtoService: ProdutoService, //injeção de dependência
    private carrinhoComprasService: CarrinhoComprasService, //injeção de dependência
    private router: Router, //navegação de rotas    
  ) { }

  ngOnInit(): void {
    this.produtos = this.produtoService.getAll();
  }

  //função para avançar e voltar na paginação
  handlePageChange(event: any): void {
    this.page = event;
  }

  obterProduto(item: Produto): void {
    this.itemProduto = item;
  }

  adicionarProduto(item: Produto): void {

    //adicionar o produto no carrinho de compras..
    this.carrinhoComprasService.adicionarItem(item);

    this.router.navigate(['/carrinho-compras']);
  }

}
