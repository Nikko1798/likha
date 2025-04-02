<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactDetail extends Model
{
    //
    function personal_information(){
        return $this->belongsTo(PersonalInformation::class);
    }
}
