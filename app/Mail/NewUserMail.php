<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewUserMail extends Mailable
{
    use Queueable, SerializesModels;

    private $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $sender = config('app.app_email');
        return $this->from($sender)
            ->subject($this->data['subject'])
            ->view('email.user-mail', [
                'data' => $this->data,
            ]);
    }
}
