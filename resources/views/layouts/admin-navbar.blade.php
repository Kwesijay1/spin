<!-- Navigation-->
<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div class="container">
        <a class="navbar-brand" href="{{url('/')}}"><img src="assets/img/navbar-logo.jpg" alt="..." /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fas fa-bars ms-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                <li class="nav-item"><a class="nav-link" href="{{url('/')}}">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="{{route('home')}}">Dashboard</a></li>
                @auth()
{{--                    <li>--}}
{{--                        <a class="nav-link" href="" onclick="preventDefault();--}}
{{--                                                     document.getElementById('logout-form').submit();">--}}
{{--                            Logout</a>--}}

{{--                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">--}}
{{--                            @csrf--}}
{{--                        </form>--}}
{{--                    </li>--}}
                    <logout-component
                        logout-url="{{route('logout')}}"
                        csrf_token="{{csrf_token()}}"
                    ></logout-component>
                @endauth
            </ul>
        </div>
    </div>
</nav>
