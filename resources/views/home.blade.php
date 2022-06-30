@extends('layouts.app')

@section('content')
<div class="container-fluid p-5 justify-content-center">
    <dashboard-component
        banner-route="{{route('banners.store')}}"
        about-route="{{route('about.store')}}"
        about-section-route="{{route('about-section.store')}}"
        about-section-change-image="{{route('about-section-change-image')}}"
        event-route="{{route('campaign-event.store')}}"
        post-route="{{route('post.store')}}"
        user-route="{{route('user.store')}}"
        publish-post-route="{{route('publish-post')}}"
        change-image-route="{{route('changeImage')}}"
        change-image-about-route="{{route('about-change-image')}}"
        change-image-event-route="{{route('event-change-image')}}"
        change-image-post-route="{{route('post-change-image')}}"
        facebook-token-route="{{route('facebook.redirect')}}"
        position-route="{{route('position.store')}}"
        constituency-route="{{route('constituency.store')}}"
        expectations-route="{{route('expectations.store')}}"
    >

    </dashboard-component>
</div>
@endsection
