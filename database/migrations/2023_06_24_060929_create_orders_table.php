<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('customer_name');
            $table->uuid('customer_id');
            $table
                ->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->date('date');
            $table->time('time');
            $table->text('note');
            $table->decimal('delivery_fee')->nullable();
            $table->decimal('subtotal')->nullable();
            $table->decimal('total')->nullable();
            $table->decimal('tax')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
