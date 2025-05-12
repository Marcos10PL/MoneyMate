<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      "message" => "Transaction retrieved successfully",
      "transaction" => [
        'id' => $this->id,
        'name' => $this->name,
        'amount' => $this->amount,
        'type' => $this->type->name,
        "user" => $this->user,
        'category' => $this->category->name,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ],
    ];
  }
}
