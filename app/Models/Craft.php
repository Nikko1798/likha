<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Craft extends Model
{
    //
    function personal_information(){
        return $this->belongsTo(PersonalInformation::class);
    }
}
