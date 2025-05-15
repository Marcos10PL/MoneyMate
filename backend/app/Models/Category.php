<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  public $timestamps = false;

  protected $fillable = [
    'name',
  ];

  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
