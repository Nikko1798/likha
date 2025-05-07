<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Crypt;
class Address extends Model
{
    //
    protected $guarded=[];
    function personal_information(){
        return $this->belongsTo(PersonalInformation::class);
    }
    protected function street(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Crypt::decrypt($value),
            set: fn ($value) => Crypt::encrypt($value),
        );
    }
}
