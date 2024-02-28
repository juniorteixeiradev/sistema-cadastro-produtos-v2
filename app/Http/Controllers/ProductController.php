<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Retorna a lista de produtos.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Retorna os detalhes de um produto específico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produto não encontrado'], 404);
        }

        return response()->json($product);
    }

    /**
     * Armazena um novo produto no banco de dados.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validação dos dados do formulário
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            // Adicione outras regras de validação conforme necessário
        ]);

        // Criação do produto no banco de dados
        $product = Product::create([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            // Adicione outros campos do produto conforme necessário
        ]);

        // Retorna o produto criado como JSON
        return response()->json($product, 201);
    }

    /**
     * Atualiza um produto no banco de dados.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Validação dos dados do formulário
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            // Adicione outras regras de validação conforme necessário
        ]);

        // Encontrar o produto pelo ID
        $product = Product::find($id);

        // Verificar se o produto existe
        if (!$product) {
            return response()->json(['message' => 'Produto não encontrado'], 404);
        }
        try {
            // Atualizar os campos do produto
            $product->update([
                'name' => $request->input('name'),
                'price' => $request->input('price'),
                'coust' => $request->input('coust'),
                'description' => $request->input('description'),
                'category' => $request->input('category'),
                // Adicione outros campos do produto conforme necessário
            ]);

            // Retorna o produto atualizado como JSON
            return response()->json($product);
        } catch (\Exception $e) {
            \Log::error('Erro ao atualizar produto: ' . $e->getMessage());
            return response()->json(['error' => 'Erro interno do servidor'], 500);
        }
    }
}
