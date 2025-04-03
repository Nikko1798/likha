<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyBackground extends Model
{
    //
    protected $guarded=[];
    function personal_information(){
        return $this->belongsTo(PersonalInformation::class);
    }
}
