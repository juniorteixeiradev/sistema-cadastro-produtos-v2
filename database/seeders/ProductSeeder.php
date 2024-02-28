<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name' => 'Produto 1',
            'coust' => 5.90,
            'description' => 'Exemplo de Produto',
            'category' => 'Eletrônicos',
            'price' => 19.99,
            // Adicione outros campos conforme necessário
        ]);
    }
}
